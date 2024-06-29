const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const clubsRouter = require("./routes/clubs");
const instructorsRouter = require("./routes/instructors");
const usersRouter = require("./routes/users");
const bookingsRouter = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 5001;

// Google Init
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());

// API Routes
app.use("/clubs", clubsRouter);
app.use("/instructors", instructorsRouter);
app.use("/users", usersRouter);
app.use("/bookings", bookingsRouter);

mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes will be added here

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
