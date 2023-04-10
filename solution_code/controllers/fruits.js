const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')
const User = require('../models/user.js');
const { isFruitOwner } = require('../db/auth.js');
const isAuthenticated = require('../db/auth.js').isAuthenticated;

// Post
router.post('/', isAuthenticated, async (req, res) => {
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    req.body.user = res.locals.userId; // set user id on new fruit object
    const fruit = await Fruit.create(req.body);

    const user = await User.findById(req.session.userId);
    if (!user) {
        return res.send('User not found.');
    }
    user.fruits.push(fruit);
    await user.save();

    res.redirect('/fruits');
});

// New
router.get('/new', (req, res) => {
    res.render("fruits/new.ejs")
})

// /fruits/123/edit
router.get('/:id/edit', isAuthenticated, isFruitOwner, async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/edit.ejs", {fruit})
})

// Index...show all fruits
router.get('/', async (req, res) => {
    let user
    if(req.session.currentUser) user = req.session.currentUser.username
    const fruits = await Fruit.find({});
    res.render("fruits/index.ejs", {fruits, user});
});

// Seed
router.get('/seed', async (req, res) => {
    await Fruit.deleteMany({});
    await Fruit.create(startFruits);
    res.redirect('/fruits');
});

// Show...show one fruit
router.get('/:id', async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/show.ejs", {fruit})
});

// Delete
router.delete('/:id', isAuthenticated, isFruitOwner, async (req, res) => {
    try {
        const fruit = await Fruit.findById(req.params.id);
        const user = await User.findById(req.session.userId);

        if (!user || !fruit) {
            return res.send('User or fruit not found.');
        }

        await fruit.remove();
        user.fruits.pull(req.params.id);
        await user.save();
        res.redirect('/fruits');
    } catch (err) {
        console.log(err);
        res.send('Error deleting fruit.');
    }
});

// Update
router.put('/:id', isAuthenticated, isFruitOwner, async (req, res) => {
    try {
        const id = req.params.id;
        const fruit = await Fruit.findById(id);
        
        if (!fruit) {
            return res.send('Fruit not found.');
        }

        req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
        await Fruit.findByIdAndUpdate(id, req.body);

        res.redirect('/fruits');
    } catch (err) {
        console.log(err);
        res.send('Error updating fruit.');
    }
});

module.exports = router;
