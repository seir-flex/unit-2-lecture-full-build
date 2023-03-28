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
	res.redirect('fruit seed route');
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
