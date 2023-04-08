const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')

// Post
router.post('/', async (req, res) => {
	console.log(req.body)
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
	const fruit = await Fruit.create(req.body);
	res.redirect('/fruits');
});

// New
router.get('/new', (req, res) => {
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
	const fruit = await Fruit.findByIdAndDelete(req.params.id);
	res.redirect('/fruits');
});

// Update
router.put('/:id', async (req, res) => {
	const id = req.params.id;
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
	const fruit = await Fruit.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.redirect('/fruits');
});

module.exports = router;
