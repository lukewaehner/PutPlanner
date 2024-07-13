const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    date: { type: Date, required: true },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

bookingSchema
  .pre("find", function (next) {
    this.populate("instructor");
    this.populate("user");
    next();
  })
  .pre("findOne", function (next) {
    this.populate("instructor");
    this.populate("user");

    next();
  });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
