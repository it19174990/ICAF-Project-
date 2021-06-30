const db = require("../models");
const Workshop = db.workshop;

// Create and Save a new Workshop
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Workshop
  const workshop = new Workshop({
    title: req.body.title,
    presenter: req.body.presenter,
    email: req.body.email,
    phone: req.body.phone,
    published: req.body.published ? req.body.published : false
  });

  // Save Workshop in the database
  workshop
    .save(workshop)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Workshop."
      });
    });
};

// Retrieve all Workshop from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Workshop.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Workshop."
      });
    });
};

// Find a single Workshop with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Workshop.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Workshop with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Workshop with id=" + id });
    });
};

// Update a Workshop by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Workshop.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Workshop with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Workshop was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Workshop with id=" + id
      });
    });
};

// Delete a Workshop with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Workshop.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Workshop with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Workshop was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Workshop with id=" + id
      });
    });
};

// Delete all Workshops from the database.
exports.deleteAll = (req, res) => {
  Workshop.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Workshops were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all workshops."
      });
    });
};

// Find all published workshops
exports.findAllPublished = (req, res) => {
  Workshop.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving workshops."
      });
    });
};