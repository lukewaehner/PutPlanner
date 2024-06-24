const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: { type: String, required: true },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    instructors: [{ type: Schema.Types.ObjectId, ref: "Instructor" }],
  },
  {
    timestamps: true,
  }
);

clubSchema.index({ location: "2dsphere" });

const Club = mongoose.model("Club", clubSchema);

module.exports = Club;
