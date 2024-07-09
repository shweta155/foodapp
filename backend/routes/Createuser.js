const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const jwtSecret = "Mynameisshwetaladne";

router.post("/createuser",
  [

    body('email').isEmail(),
    body('password', "Incorrect Password").isLength({ min: 5 }),
    body('name').isLength({ min: 5 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /* ye hamne passsword ko hashing me show ho esliye kiye hai taki koi password access na kar sake */
    const salt = await bycrypt.genSalt(10);
    let secPassword = await bycrypt.hash(req.body.password, salt);
    /* only two line*/
    try {
      await User.create({

        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email

      })
      res.json({ success: true });
    } catch (error) {
      console.log(error);

    }
  })




router.post("/loginuser", [

  body('email').isEmail(),
  body('password', "Incorrect Password").isLength({ min: 5 }),

],
  async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "try loging with correct data" });
      }

      const pwdCompare = await bycrypt.compare(req.body.password, userData.password);

      if (!pwdCompare) {
        return res.status(400).json({ errors: "try loging with correct data " });
      }

      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });


    } catch (error) {
      console.log(error);

    }
  })
module.exports = router;