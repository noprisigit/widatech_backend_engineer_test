const router = require('express').Router();

const ProductController = require('../controllers/ProductController');
const upload = require('../middlewares/upload');

let routes = (app) => {
  router.post('/upload', upload.single("file"), ProductController.upload);

  app.use("/api/product", router);
}

module.exports = routes;