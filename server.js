const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const dbConnect = require("./utils/dbConnect");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
// Connect DB
// dbConnect();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/doc", require("./routes/doc"));

app.use("/folder", require("./routes/folder"));

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
