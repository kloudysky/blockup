const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
const mongoose = require("mongoose");
const passport = require("passport");
const validateRoomNameInput = require("../../validation/room");
const RoomMember = require("../../models/RoomMember");

router.get("/user/:user_id", (req, res) => {
  //    Room.find({"members": {id: req.params.user_id}});

  Room.find({
    $or: [{ members: { $elemMatch: { id: `${req.params.user_id}` } } }],
  })
    .limit(10)
    .then((rooms) => {
      res.json(rooms);
    });
});

router.get("/:id", (req, res) => {
  handelErr = function (err) {
    res
      .status(404)
      .json({ noRoomFound2: "Looks like this room does not exist" });
  };

  let showRoom = Room.findById(req.params.id);
  showRoom
    .populate({
      path: "messages",
      populate: { path: "author username" },
    })
    .exec()
    .then((room) => {
      res.json(room);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ noRoomFound: "Looks like this room does not exist" })
    );
});

router.post("/new", (req, res) => {
  // const { errors, isValid } = validateRoomNameInput(req.body);
  // debugger;
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  const { user, name } = req.body;
  let otherMembers = req.body.members || [];
  otherMembers.push({_id: user.id});
  const newRoom = new Room({
    name: name,
    img_url: req.body.img_url || "",
    members: otherMembers,
    messages: [],
  });

  newRoom
  .save()
  .then((room) => { room.populate('members'); console.log("after pop", room); res.json(room)})
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      invalidRoomCredentials: "Looks like this room was not able to save",
    });
  });
});

module.exports = router;
