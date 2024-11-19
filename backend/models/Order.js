const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  notes: { type: String },
  total: { type: Number, required: true },
  items: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  paymentMethod: { type: String, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);