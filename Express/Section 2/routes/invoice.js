const router = require('express').Router();

const InvoiceController = require('../controllers/InvoiceController');
const upload = require('../middlewares/upload');

let routes = (app) => {
  router.post("/upload", upload.single("file"), InvoiceController.upload);

  app.use("/api/invoice", router);
}

module.exports = routes;