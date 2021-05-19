const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
const mongoose = require("mongoose");
const passport = require("passport");
const validateRoomNameInput = require("../../validation/room");
const RoomMember = require("../../models/RoomMember");

router.get("/user/:user_id", (req, res) => {
     Room.find({"members": {_id: req.params.user_id}})
     .populate( "members", "_id username")
     .populate("messages", "content -_id")
     
    //  {
    // path: "messages",
    // populate: { path: "author username" },
  // }
  // Room.find({
  //   $or: [{ members: { $elemMatch: { id: req.params.user_id } } }],
  // })
    // .limit(10)
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
  // ;
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
  // friendship.save().then(friendship =>  {
//   Friendship.findById(friendship._id)
//   .populate('friend1','username').populate('friend2','username')
//   .then(friendship => res.json(friendship ))
// } ) 

  newRoom
  .save()
  // .then((room) => { room.populate('members'); console.log("after pop", room); res.json(room)})
  .then((room) => {
    Room.findById(room._id)
    .populate( "members", "_id username")
    .then(room1 => res.json(room1))
  })
  .catch((err) => {
    console.log(err);
    res.status(404).json({
      invalidRoomCredentials: "Looks like this room was not able to save",
    });
  });
});

router.delete("/delete/:id", (req, res) => {
    Room.findByIdAndRemove(req.params.id)
    .then((room) => {
        return res.json(room)
        // res.json({successDelete: "Success Delete"}) 
    })
});

module.exports = router;
