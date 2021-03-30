const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const speakeasy = require("speakeasy");

const User = require("../../models/User");

router.post("/verifyTwoFA", (req, res) => {
  console.log("WHAT");
  console.log(req.body);
  console.log(req.body.token);
  console.log(req.body.userId);
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
        console.log(user);
        res.json({ user });
      } else {
        console.log("Your token doesn't match");
        console.log(user);
        //res.json({ user });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User not found" });
  }
});

module.exports = router;
