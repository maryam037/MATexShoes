const mongoose = require('mongoose');

const ShoeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: Number }],
  color: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  additionalImages: [{ type: String }],
  isSoldOut: { type: Boolean, default: false }
});

module.exports = mongoose.model('Shoe', ShoeSchema);