/* eslint-disable no-undef */
/* INSTALLATION */
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messagesRoutes");


/* CONFIGURATIONS */

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

/* ROUTES */

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const port = process.env.PORT || 4000;


// DATABASE

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log("Server is running"));
    console.log("DB Connection successfull");
  })
  .catch((err) => console.log(err));







