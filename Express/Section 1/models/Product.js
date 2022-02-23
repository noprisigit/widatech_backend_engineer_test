const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    minlength: 5,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  totalCostOfGoodsSold: {
    type: Number,
    required: true,
    min: 0,
  },
  totalPriceSold: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
