const express = require("express");
const blog = require("../controller/blog.controller");
const router = express.Router();

// /api/blog: GET, POST, DELETE
// /api/blog/:id: GET, PUT, DELETE
// /api/blog/published: GET

// Create a new Blog
router.post("/", blog.create);

// Retrieve all Blogs
router.get("/", blog.findAll);

// Retrieve a single Blog with id
router.get("/:id", blog.findOne);

// Update a Blog with id
router.put("/:id", blog.update);

// Delete a Blog with id
router.delete("/:id", blog.delete);

// Create a new Blog
router.delete("/", blog.deleteAll);

module.exports = router;
