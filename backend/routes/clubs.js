const router = require("express").Router();
let Club = require("../models/club.model");

router.route("/").get((req, res) => {
  Club.find()
    .then((clubs) => res.json(clubs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const address = req.body.address;
  const description = req.body.description;
  const image = req.body.image;
  const instructors = req.body.instructors;

  const newClub = new Club({
    name,
    location,
    address,
    description,
    image,
    instructors,
  });

  newClub
    .save()
    .then(() => res.json("Club added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").post((req, res) => {
  const { name, location, address, description, image, instructors } = req.body;

  Club.findByIdAndUpdate(
    req.params.id,
    { $set: { name, location, address, description, image, instructors } },
    { new: true } // Return the updated document
  )
    .then((club) => res.json(club))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Club.findById(req.params.id)
    .populate("instructors") // Populate the instructors field
    .then((club) => res.json(club))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
