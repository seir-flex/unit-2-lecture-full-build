const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')
const User = require('../models/user.js')
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
    console.log(req.session)
 res.render("fruits/new.ejs")
})

// /fruits/123/edit
router.get('/:id/edit', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	res.render("fruits/edit.ejs", {fruit})
})

// Index...show all fruits
router.get('/', async (req, res) => {
	let user
	console.log(req.session);
	if(req.session.currentUser) user = req.session.currentUser.username
	// wait or this to complete
	// Fruit.find() is a Promise
	// Promise is resolved or rejected
	const fruits = await Fruit.find({});
	// then run the next line of code
	// res.send(fruits);
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
	// res.send(fruit);
	res.render("fruits/show.ejs", {fruit})
});

// Delete
router.delete('/:id', async (req, res) => {
    const fruit = await Fruit.findById(req.params.id);

    if (fruit.user === req.session.userId) {
        await Fruit.findByIdAndDelete(req.params.id);

        const user = await User.findById(req.session.userId);
        user.fruits.pull(req.params.id);
        await user.save();

        res.redirect('/fruits');
    } else {
        res.send('You are not authorized to delete this fruit.');
    }
});

// Update
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
    const fruit = await Fruit.findById(id);
    
    if (fruit.user === req.session.userId) {
        const updatedFruit = await Fruit.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.redirect('/fruits');
    } else {
        res.send('You are not authorized to update this fruit.');
    }
});

module.exports = router;
