const Product = require('../models/Product');
const productSeeder = require('../seeders/ProductSeeder');

module.exports = {
  store: async (req, res) => {
    await Product.insertMany(productSeeder);

    res.status(201).json({
      status: true,
      data: productSeeder
    })
  }
}