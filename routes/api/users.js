const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

const Friendship = require('../../models/Friendship');
const FriendRequest = require('../../models/FriendRequest');

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Success" });
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user has already registered with this address" });
    } else {
      const auth_token = speakeasy.generateSecret({
        name: "Blockup",
      });
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        secret: auth_token.base32,
        otpauth_url: auth_token.otpauth_url,
      });

      console.log(newUser);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, username: user.username };
              console.log(user);

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer" + token,
                  });
                }
              );

              const friendship = new Friendship({
                friend1: "60a275df35220b0c9f8846c7",
                friend2: user._id
              })

              friendship.save()
              
              const friendRequest1 = new FriendRequest({
                senderId: "60a276796cd7290d37467407",
                receiverId: user._id
              })
              
              friendRequest1.save()

              const friendRequest2 = new FriendRequest({
                senderId: user._id,
                receiverId: "60a277231c7ec00d9bf50ff6"
              })
              
              friendRequest2.save()

              const newRoom1 = new Room({
                name: "Blockup Assistant && " + user.username,
                img_url: req.body.img_url || "",
                members: [{_id:"60a275df35220b0c9f8846c7"}, {_id:user._id}],
                messages: [], 
              });
            
              newRoom1.save()

              const newRoom2 = new Room({
                name: "Blockup Developers && " + user.username,
                img_url: req.body.img_url || "",
                members: [{_id:"60633293e2e3a540721cb55d"}, {_id:"60a27af5862e570de3ada7d0"}, {_id:"60a27ba7862e570de3ada7d5"}, {_id:"60a27d57862e570de3ada7da"}, {_id:user._id}],
                messages: [], 
              });
            
              newRoom2.save()
       
              res.json({ user });
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          username: user.username,
          verified: user.verified,
          otpauth_url: user.otpauth_url,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    });
  });
});

router.patch("/verifyTwoFA", (req, res) => {
  const token = req.body.token;
  const userId = req.body.userId;
  User.findOne({ _id: userId }).then((user) => {
    const verified = speakeasy.totp.verify({
      secret: user.secret,
      encoding: "base32",
      token,
    });

    if (verified) {
      user.verified = true;
      user.save().then((user) => res.json(user));
    } else {
      console.log("Token does not match");
      //res.json(user);
      res.status(400).json({ message: "Token does not match" });
      //create error for errors reducer
      //res.json({ user });
    }
  });
});

module.exports = router;
