const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
const keys = require("../../config/keys");
const mongoose = require('mongoose');


const validateRoomNameInput = require("../../validation/room");
const passport = require("passport");

router.get('/', (req, res) => {
    Room.find()
        .then(rooms => res.json(rooms))
        .catch(err => 
            res.status(404).json({ noRoomsFound: 'Looks like you have not made any rooms yet!'}
        )
    );
})

router.get('/rooms/:id', (req, res) => {
    Room.findById(req.params.id)
    .then(room => res.json(room))
    .ctch(err => 
        res.status(404).json({ noRoomFound: 'Looks like this room does not exsist'})
        )
})

router.post( '/rooms/new', 
    passport.authenticate('jwt', {session: false }),
    (req, res) => {
        const {errors, isValid} = validateRoomNameInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newRoom = new Room({
            name: req.body.name,
            img_url: req.body.img_url,
        })

        newRoom.save().then(room => res.json(room));
    }
);

router.delete

module.exports = router;