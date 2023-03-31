const express = require('express');
const router = express.Router();

// Create
router.post('/', async (req, res) => {
	res.send('fruit post route');
});

// Index
router.get('/', async (req, res) => {
	res.send('fruit index route');
});

// Seed
router.get('/seed', async (req, res) => {
  const startFruits = [
    { name: "Orange", color: "orange", readyToEat: false },
    { name: "Grape", color: "purple", readyToEat: false },
    { name: "Banana", color: "orange", readyToEat: false },
    { name: "Strawberry", color: "red", readyToEat: false },
    { name: "Coconut", color: "brown", readyToEat: false },
  ];

  Fruit.remove({}, () => {
	Fruit.create(startFruits, (error, data) => {
		res.json(data)
	})
  })
});

// Show
router.get('/:id', async (req, res) => {
	res.send('fruit show route');
});

// Delete
router.delete('/:id', async (req, res) => {
	res.send('fruit delete route');
});

// Update
router.put('/:id', async (req, res) => {
	res.send('fruit update route');
});

module.exports = router;
