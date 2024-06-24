const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const clubsRouter = require("./routes/clubs");
const instructorsRouter = require("./routes/instructors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/clubs", clubsRouter);
app.use("/instructors", instructorsRouter);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes will be added here

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
