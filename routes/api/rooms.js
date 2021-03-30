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

    const userRooms = RoomMember.find({member_id: req.params.user_id});
    consile.log(userRooms);
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => 
            res.status(404).json({ noRoomsFound: 'Looks like you have not made any rooms yet!'}
        )
    );
})

router.get('/', (req, res) => {
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => 
            res.status(404).json({ noRoomsFound: 'Looks like you have not made any rooms yet!'}
        )
    );
})

router.get('/:id', (req, res) => {
    Room.findById(req.params.id)
    .then(room => res.json(room))
    .catch(err => 
        res.status(404).json({ noRoomFound: 'Looks like this room does not exsist'})
        )
})

router.post( '/new', 
    (req, res) => {
        const {errors, isValid} = validateRoomNameInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRoom = new Room({
            name: req.body.name,
            img_url: req.body.img_url || "",
        })

        newRoom.save().then(room => res.json(room));
    }
);

module.exports = router;