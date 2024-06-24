const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    picture: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    club: { type: Schema.Types.ObjectId, ref: "Club" },
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
