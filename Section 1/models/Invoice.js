const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    minlength: 2
  },
  salesPersonName: {
    type: String,
    required: true,
    minlength: 2
  },
  paymentType: {
    type: String,
    enum: ['CASH', 'CREDIT'],
    required: true
  },
  notes: {
    type: String,
    required: true,
    minlength: 5
  },
  listOfProductsSold: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    }
  ]
});

module.exports = mongoose.model('Invoice', InvoiceSchema)