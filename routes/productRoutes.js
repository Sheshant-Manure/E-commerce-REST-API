// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/ProductSchema');
const Variant = require('../models/VariantSchema');

// Create a new product and its variants
router.post('/', async (req, res) => {
  try {
    const { name, description, price, variants } = req.body;

    // Create the product
    const product = await Product.create({ name, description, price });

    // Create variants and associate them with the product
    if (variants && variants.length > 0) {
      const createdVariants = await Variant.create(variants);
      product.variants = createdVariants.map((variant) => variant._id);
      await product.save();
    }

    res.status(201).json({ product, message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products with their variants
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('variants');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
