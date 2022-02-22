const yup = require('yup');

const invoiceSchema = yup.object().shape({
  invoiceNo: yup.string().trim().required().min(1),
  date: yup.date().default(function() {
    return new Date();
  }),
  customerName: yup.string().trim().required().min(2),
  salesPersonName: yup.string().trim().required().min(2),
  paymentType: yup.string().trim(),
  notes: yup.string().trim().required().min(5),
  listOfProductsSold: yup.array().required()
});

module.exports = invoiceSchema;