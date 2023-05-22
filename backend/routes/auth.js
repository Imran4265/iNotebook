const express = require("express");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "imran@3";
const mongoose = require("mongoose");

//create a user using:POST "/api/auth/createuser" .no login required

router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are errors return bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      //check whether user exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a usrouterer with this email already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const token = jwt.sign(data, JWT_SECRET);
      console.log(success, token);
      res.json({ success, token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured");
    }
  }
);

// login user
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const passwordComapare = await bcrypt.compare(password, user.password);
      if (!passwordComapare) {
        success = false;
        return res.status(400).json({ error: "Invalid Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      try {
        const json = await res.json({ success: true, token });
        console.log("authtoken is:", token);
        success = true;
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error occured");
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured");
    }
  }
);

router.post("/getuser", fetchuser, async (req, res) => {
  try {
   let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
