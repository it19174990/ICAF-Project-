module.exports = app => {
    const workshops= require("../controllers/workshop.controller.js");
  
    var router = require("express").Router();
  
    // Create a new workshops
    router.post("/", workshops.create);
  
    // Retrieve all workshops
    router.get("/", workshops.findAll);
  
    // Retrieve all published workshops
    router.get("/published", workshops.findAllPublished);
  
    // Retrieve a single workshops with id
    router.get("/:id", workshops.findOne);
  
    // Update a workshops with id
    router.put("/:id", workshops.update);
  
    // Delete a workshops with id
    router.delete("/:id", workshops.delete);
  
    // Create a new workshops
    router.delete("/", workshops.deleteAll);
  
    app.use("/api/workshops", router);
  };
  