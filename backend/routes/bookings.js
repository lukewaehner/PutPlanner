const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.model");
const Instructor = require("../models/instructor.model");
const User = require("../models/user.model");

// Route to get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new booking
router.post("/", async (req, res) => {
  const { instructorId, userId, date, startTime, endTime } = req.body;

  // Check if all required fields are provided
  if (!instructorId || !userId || !date || !startTime || !endTime) {
    return res.status(400).json("All fields are required");
  }

  // Convert the date to a Date object and normalize to midnight UTC
  const bookingDate = new Date(date);
  bookingDate.setUTCHours(0, 0, 0, 0);

  // Convert start and end times to Date objects
  const start = new Date(`${date}T${startTime}:00Z`);
  const end = new Date(`${date}T${endTime}:00Z`);

  if (start >= end) {
    return res.status(400).json("End time must be after start time");
  }

  try {
    const instructor = await Instructor.findById(instructorId);
    const user = await User.findById(userId);

    if (!instructor) {
      return res.status(404).json("Instructor not found");
    }

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Find the availability for the given date
    const availability = instructor.availability.find(
      (av) =>
        av.date.toISOString().split("T")[0] ===
        bookingDate.toISOString().split("T")[0]
    );

    if (!availability) {
      return res.status(400).json("No availability for this date");
    }

    // Check if the requested time slot is available
    const isSlotAvailable = availability.timeSlots.some((slot) => {
      const slotStart = slot.start;
      const slotEnd = slot.end;
      return slotStart <= startTime && slotEnd >= endTime && !slot.isBooked;
    });

    if (!isSlotAvailable) {
      return res.status(400).json("Selected time slot is not available");
    }

    // Create a new booking
    const booking = new Booking({
      date: bookingDate,
      instructor: instructorId,
      user: userId,
      startTime,
      endTime,
    });

    await booking.save();

    // Update instructor availability
    availability.timeSlots = availability.timeSlots.flatMap((slot) => {
      if (slot.start <= startTime && slot.end >= endTime) {
        if (slot.start === startTime && slot.end === endTime) {
          return [{ ...slot, isBooked: true }];
        } else {
          const newSlots = [];
          if (slot.start < startTime) {
            newSlots.push({
              start: slot.start,
              end: startTime,
              isBooked: false,
            });
          }
          newSlots.push({
            start: startTime,
            end: endTime,
            isBooked: true,
          });
          if (slot.end > endTime) {
            newSlots.push({
              start: endTime,
              end: slot.end,
              isBooked: false,
            });
          }
          return newSlots;
        }
      }
      return [slot];
    });

    await instructor.save();

    // Add booking to user's bookings array
    user.bookings.push(booking._id);
    await user.save();

    res.json("Booking successful!");
  } catch (err) {
    console.error(err);
    res.status(400).json("Error: " + err);
  }
});

// Route to get all bookings for a specific user
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ user: userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get all bookings for a specific instructor
router.get("/instructor/:instructorId", async (req, res) => {
  const instructorId = req.params.instructorId;

  try {
    const bookings = await Booking.find({ instructor: instructorId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
