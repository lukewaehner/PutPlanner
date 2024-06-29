const router = require("express").Router();
const Instructor = require("../models/instructor.model");
const Club = require("../models/club.model");

// Get all instructors
router.route("/").get((req, res) => {
  Instructor.find()
    .then((instructors) => res.json(instructors))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a specific instructor by ID
router.route("/:id").get((req, res) => {
  Instructor.findById(req.params.id)
    .then((instructor) => {
      if (!instructor) {
        return res.status(404).json("Instructor not found");
      }
      res.json(instructor);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Add a new instructor
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  const picture = req.body.picture;
  const rating = Number(req.body.rating);
  const clubId = req.body.clubId;

  const newInstructor = new Instructor({
    name,
    bio,
    picture,
    rating,
    club: clubId,
    availability: [], // Initialize with empty availability
  });

  newInstructor
    .save()
    .then((instructor) => {
      return Club.findByIdAndUpdate(clubId, {
        $push: { instructors: instructor._id },
      });
    })
    .then(() => res.json("Instructor added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Route to add or update availability for a specific instructor
router.post("/:id/availability", async (req, res) => {
  const instructorId = req.params.id;
  const { date, timeSlots } = req.body;

  if (!date || !timeSlots) {
    return res.status(400).json("Date and time slots are required");
  }

  // Validate time slots
  for (const slot of timeSlots) {
    if (
      new Date(`1970-01-01T${slot.start}:00Z`) >=
      new Date(`1970-01-01T${slot.end}:00Z`)
    ) {
      return res.status(400).json("End time must be after start time");
    }
  }

  try {
    // Convert date to ISO string for accurate comparison
    const isoDate = new Date(date).toISOString().split("T")[0];

    // Find the instructor and update availability
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json("Instructor not found");
    }

    // Check if the availability for the given date exists
    const existingAvailability = instructor.availability.find(
      (a) => a.date.toISOString().split("T")[0] === isoDate
    );

    if (existingAvailability) {
      // Update the time slots for the existing date
      existingAvailability.timeSlots = timeSlots;
    } else {
      // Add new availability entry
      instructor.availability.push({
        date: new Date(date),
        timeSlots,
      });
    }

    await instructor.save();
    res.json("Availability updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/:id/availability", async (req, res) => {
  const { id } = req.params;

  try {
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json("Instructor not found");
    }

    // Return all availability for the instructor
    res.json(instructor.availability);
  } catch (error) {
    res.status(500).json("Error: " + error);
  }
});

module.exports = router;
