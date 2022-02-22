const router = require('express').Router();
const validation = require('../middlewares/ValidationInput');
const invoiceValidationSchema = require('../utils/InvoiceValidationSchema');
const InvoiceController = require('../controllers/InvoiceController');

router.post('/', validation(invoiceValidationSchema), InvoiceController.store);

module.exports = router;