const express = require('express');
const router = express.Router();
const startFruits = require('../db/fruitSeedData.js')
const Fruit = require('../models/fruit.js')

// 
router.post('/', async (req, res) => {
	// check if the readyToEat property should be true or false
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;
	const fruit = await Fruit.create(req.body);
	res.redirect('/fruits');
});

router.get('/new', async (req, res) => {
	res.render("fruits/new.ejs")
});

// Index
router.get('/', async (req, res) => {
	const fruits = await Fruit.find({});
	// res.send(fruits);
	res.render('fruits/index.ejs', { fruits });
});

// Seed
router.get('/seed', async (req, res) => {
	await Fruit.deleteMany({});
	await Fruit.create(startFruits);
	res.redirect('/fruits');
});

// Show
router.get('/:id', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	console.log('fruit', fruit)
	res.render('fruits/show.ejs', { fruit });
});

// Delete
router.delete('/:id', async (req, res) => {
	const fruit = await Fruit.findByIdAndDelete(req.params.id);
	res.redirect('/fruits');
});

// Edit

router.get('/:id/edit', async (req, res) => {
	const fruit = await Fruit.findById(req.params.id);
	res.render('fruits/edit.ejs', { fruit });
})

// Update
router.put('/:id', async (req, res) => {
	req.body.readyToEat = req.body.readyToEat === 'on' ? true : false;

	const fruit = await Fruit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.redirect('/fruits');
});

module.exports = router;
