const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;