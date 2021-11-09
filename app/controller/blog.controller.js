const Blog = require("../model/blog.model");

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).json({ msg: "Title can not be empty!" });
    return;
  }

  // Create blog
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });

  // Save blog

  blog
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Error occured while creating the blog.",
      });
    });
};

// Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const cond = title ? { title: { $regex: title, $options: "i" } } : {};

  Blog.find(cond)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Error occurred while retrieving Blogs.",
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((data) => {
      if (!data) res.status(404).json({ msg: "No Blog with id= " + id });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Error retrieving Blog with id=" + id });
    });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: `Cannot update Blog with id=${id}.`,
        });
      } else res.json({ message: "Blog updated." });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error updating Blog with id=" + id,
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {};
