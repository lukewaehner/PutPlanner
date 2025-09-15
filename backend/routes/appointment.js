const express = require("express");
const router = express.Router();
const Booking = require("./models/Booking");
const Instructor = require("./models/Instructor");

// Endpoint for user to book an appointment
router.post("/appointment", async (req, res) => {
  const { instructorId, userId, date, startTime, endTime } = req.body;

  // Save the appointment
  const booking = new Booking({
    date,
    instructor: instructorId,
    user: userId,
    startTime,
    endTime,
  });

  await booking.save();

  // Update instructor availability
  const instructor = await Instructor.findById(instructorId);
  const availability = instructor.availabilities.find(
    (av) => av.day === new Date(date).getDay()
  );

  if (!availability) {
    return res.status(400).send("No availability for this day");
  }

  // Remove the booked slot from availability
  const newSlots = availability.slots.filter(
    (slot) => !(slot.startTime < endTime && slot.endTime > startTime)
  );

  availability.slots = newSlots;
  await instructor.save();

  res.send(booking);
});

module.exports = router;
