const express = require("express");
const router = express.Router();
const speakeasy = require("speakeasy");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const qrcode = require("qrcode");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Success" });
  }
);

// router.post(
//   "/verifyTwoFA",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     const token = req.body.token;
//     const userId = req.user.id;
//     console.log(req.body);
//     console.log(req.user);
//     try {
//       User.findOne({ _id: userId }).then((user) => {
//         const verified = speakeasy.totp.verify({
//           secret: user.secret,
//           encoding: "base32",
//           token,
//         });

//         if (verified) {
//           user.verified = true;
//           user.save();
//           console.log(user);
//           res.json({ user });
//         } else {
//           console.log("error");
//           console.log(user);
//           res.json({ user });
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "User not found" });
//     }
//   }
// );

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
              res.json({ user, qr: user.otpauth_url, secret: user.secret });
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

module.exports = router;
