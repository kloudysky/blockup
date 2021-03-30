const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const speakeasy = require("speakeasy");

const User = require("../../models/User");

router.post("/verifyTwoFA", (req, res) => {
  const token = req.body.token;
  const userId = req.body.userId;
  try {
    User.findOne({ _id: userId }).then((user) => {
      const verified = speakeasy.totp.verify({
        secret: user.secret,
        encoding: "base32",
        token,
      });

      if (verified) {
        user.verified = true;
        user.save();
        res.json({ user });
      } else {
        console.log("Your token doesn't match");
        //create error for errors reducer
        //res.json({ user });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User not found" });
  }
});

module.exports = router;
