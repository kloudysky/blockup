const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateFriendshipInput = require("../../validation/friendship");

const Friendship = require('../../models/Friendship')

router.post('/new' , (req, res) => {
    const {errors, isValid} = validateFriendshipInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const friendship = new Friendship({
        friend1: req.body.friend1,
        friend2: req.body.friend2
    })

    friendship.save().then(friendship => res.json(friendship));
});

router.get('/:friend_id', (req, res) => {
    // Friendship.find({friend1: req.params.friend_id})
    Friendship.find({$or: [{friend1: req.params.friend_id}, {friend2: req.params.friend_id}]})
        .populate('friend1','username').populate('friend2','username')
        .then(friendships => res.json(friendships))
        .catch(err =>
            res.status(404).json({ noFriendshipfound: 'No friendships found from this user' }
        )
    );
});

  module.exports = router;