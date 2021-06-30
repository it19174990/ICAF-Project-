const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateEventInput = require("../../validation/eventvaidate");
//const validateLoginInput = require("../../validation/login");

// Load User model
const Event = require("../../models/Event");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/insert", (req, res) => {
  // Form validation

  const { errors, isValid } = validateEventInput(req.body);

  

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Event.findOne({ ename: req.body.ename}).then(user => {
    if (user) {
      return res.status(400).json({ ename: "Event already exists" });
    } else {
      const newEvent = new Event({
        ename: req.body.ename,
        edue: req.body.edue,
        edes: req.body.edes,
        link:req.body.link
      });

      if(req.body){
        const event = new Event(req.body);
        event.save().then(data => {
            res.status(200).send({data:data});
        })
            .catch(error=>{
                res.status(500).send({ error: error.message});
            });
      }
/*
      // Hash password before saving in database 
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newEvent
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      */
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;


  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          role: user.role
        
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              role: user.role
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
