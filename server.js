const express = require("express");
const blogRoutes = require("./app/routes/blog.routes");
const mongoose = require("mongoose");
const URL = require("./app/config/mongodb.config").url;
const PORT = process.env.PROT || 5000;

// Init App
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Routes
app.use("/api/blogs", blogRoutes);

// Connect to DB
mongoose
  .connect(URL)
  .then(() => {
    console.log("connected to DB...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({ msg: "RESTful API demo" });
});

// Run server on given PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
