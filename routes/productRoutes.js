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

// Update a product
router.put('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const { name, description, price, variants } = req.body || {};
  
      if (!name || !description || !price) {
        return res.status(400).json({ error: 'Name, description, and price are required' });
      }
  
      const product = await Product.findByIdAndUpdate(
        productId,
        { name, description, price },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Update variants
      if (variants && variants.length > 0) {
        const updatedVariants = await Variant.findByIdAndUpdate(
          { _id: { $in: product.variants } },
          { $set: { variants } },
          { new: true, multi: true }
        );
        product.variants = updatedVariants.map((variant) => variant._id);
        await product.save();
      }
  
      res.json({ product, message: 'Product updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
