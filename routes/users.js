const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/allUsers', (req, res) => {
    User.find({}).then((users) => {
        res.json(users);
    }).catch((err) => {
        throw err
    })
})

router.post('/addUser',function(req, res){
    const new_user = req.body;
    const user_instance = new User(new_user);
    user_instance.save().then((newUser) => {
        res.json("New User has been added");
    }).catch((err) => {
        throw err
    })   
});

module.exports = router;