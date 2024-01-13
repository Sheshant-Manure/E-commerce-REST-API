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
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Get all products with their variants
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('variants');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Update a product
router.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, price, variants } = req.body || {};

    // Validate input
    if (!name && !description && !price) {
      return res.status(400).json({ error: 'At least one of name, description, or price is required' });
    }

    // Find and update the product
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update variants only if provided
    if (variants && variants.length > 0) {
      // Find the variants and update each one
      for (const variantId of product.variants) {
        const variant = await Variant.findById(variantId);
        if (variant) {
          const updatedVariant = await Variant.findByIdAndUpdate(
            variantId,
            { $set: { variants: variants } },
            { new: true }
          );
          if (updatedVariant) {
            // Update the product's variants array
            const index = product.variants.indexOf(variantId);
            product.variants[index] = updatedVariant._id;
          }
        }
      }
      await product.save();
    }

    res.json({ product, message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // Find the product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete associated variants
    await Variant.deleteMany({ _id: { $in: product.variants } });

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

module.exports = router;
