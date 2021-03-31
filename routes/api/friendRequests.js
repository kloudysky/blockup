const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateFriendRequestInput = require('../../validation/friendRequest');

const FriendRequest = require('../../models/FriendRequest')

router.post('/new' , (req, res) => {
    const {errors, isValid} = validateFriendRequestInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const friendRequest = new FriendRequest({
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
        // status: FriendRequest.status
    })

    friendRequest.save().then(friendRequest => res.json(friendRequest));
});

module.exports = router;