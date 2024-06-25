const router = require("express").Router();
let Instructor = require("../models/instructor.model");
let Club = require("../models/club.model");

router.route("/").get((req, res) => {
  Instructor.find()
    .then((instructors) => res.json(instructors))
    .catch((err) => res.status(400).json("Error: " + err));
});

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

module.exports = router;
