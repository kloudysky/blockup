const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
const mongoose = require('mongoose');
const passport = require("passport");
const validateRoomNameInput = require("../../validation/room");
const RoomMember = require("../../models/RoomMember");

router.get('/user/:user_id',
    passport.authenticate('jwt', {session: false }),
    (req, res) => {

    // const allRooms = RoomMember.find({id: req.params.user_id});
    // const roomMemberObjects = RoomMember.find({member: req.params.user_id});
    
    RoomMember.find({member: req.params.user_id})
        .select("_id room")
        .then((userRooms) => res.json(userRooms));
    
    
    // let userRooms = {};
    // roomMemberObjects.map(roomMemberObject => {
    //     Room.findById(roomMemberObject.room)
    //       .then(room => userRooms[room._id] = room)
    // }).then(() => res.json(userRooms));
})


router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => 
        res.status(404).json({ noRoomFound: 'Looks like this room does not exist'})
        )
})

router.post('/new', 
    (req, res) => {
        const {errors, isValid} = validateRoomNameInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRoom = new Room({
            name: req.body.name,
            img_url: req.body.img_url || "",
            messages: [],
        })

        newRoom.save()
            .then((room => {
                new RoomMember({
                    room: room._id,
                    member: req.user
                })
            }).save())
            .then(room => res.json(room));
    }
);

module.exports = router;