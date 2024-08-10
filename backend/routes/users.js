const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For generating tokens


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });

    }
});
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const newUser=await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({
            message:err.message
        });

    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the password matches (plain text comparison)
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Respond with user data (no token)
        res.json({
            username: user.username,
            message: `Hello, ${user.username}!`
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports=router;