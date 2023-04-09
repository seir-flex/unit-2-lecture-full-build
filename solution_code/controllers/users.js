const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    console.log(req.query);
    let failure
    if(req.query.login === 'fail') {
        failure = "Either your username or your password did not match"
    }
    res.render('users/login', {failure});
});

router.get('/signup', (req, res) => {
    let message;
    console.log(req.query);
    if(req.query.tooShort !== undefined) {
        message = `Your password is too short. It has to be at least 6 characters and yours is only ${req.query.tooShort} characters`
    }
    res.render('users/signup', {message});
});

router.post('/login', async(req, res, next) => {
    try {
        let user;
        const userExists = await User.exists({email: req.body.email});
        if(userExists) {
            user = await User.findOne({email: req.body.email});
            // console.log(user)
        } else {
            return res.redirect('/login?login=fail');
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(match) {
            req.session.currentUser = {
                id: user._id,
                username: user.username
            };
            // console.log(req.session);
            // console.log(match);
            // console.log(userExists);
            res.redirect('/fruits');
        } else {
            res.redirect('/login?login=fail');
        }
    } catch(err) {
        console.log(err);
        next();
    }
})

router.post('/signup', async(req, res, next) => {
    try {
        const newUser = req.body;
        if(req.body.password.length < 6) {
            return res.redirect('/signup?tooShort=' + req.body.password.length)
        }
        // console.log(newUser);
        const rounds = process.env.SALT_ROUNDS
        const salt = await bcrypt.genSalt(parseInt(rounds));
        // console.log(`My salt is ${salt}`);
        const hash = await bcrypt.hash(newUser.password, salt);
        // console.log(`My hash is ${hash}`);
        newUser.password = hash;
        // console.log(newUser);
        await User.create(newUser);
        res.redirect('/login');
    } catch(err) {
        console.log(err);
        next();
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})

module.exports = router;