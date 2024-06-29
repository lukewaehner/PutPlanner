const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
  start: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format!`,
    },
  },
  end: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(v),
      message: (props) => `${props.value} is not a valid time format!`,
    },
  },
  isBooked: { type: Boolean, default: false },
});

const availabilitySchema = new Schema({
  date: { type: Date, required: true },
  timeSlots: [timeSlotSchema],
});

// Ensure the index on date for efficient queries
availabilitySchema.index({ date: 1 });

const instructorSchema = new Schema(
  {
    name: { type: String, required: true },
    bio: { type: String },
    picture: { type: String },
    rating: { type: Number, min: 0, max: 5 },
    club: { type: Schema.Types.ObjectId, ref: "Club" },
    availability: [availabilitySchema],
  },
  {
    timestamps: true,
  }
);

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;
