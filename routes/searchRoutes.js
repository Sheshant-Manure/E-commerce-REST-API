const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Search products by name, description, or variant name
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { 'variants.name': { $regex: searchQuery, $options: 'i' } },
      ],
    }).populate('variants');

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
