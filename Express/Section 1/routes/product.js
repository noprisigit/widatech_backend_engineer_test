const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.store);

module.exports = router;