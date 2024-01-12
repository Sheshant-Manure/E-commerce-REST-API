const mongoose = require('mongoose');
const VariantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    additionalCost: { type: Number, required: true },
    sku: { type: String, required: true },
    stockCount: { type: Number, required: true },
})

const Variant = mongoose.model('Variant', VariantSchema);
module.exports = Variant;