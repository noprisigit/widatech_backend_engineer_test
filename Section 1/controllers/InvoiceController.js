const Invoice = require('../models/Invoice');

module.exports = {
  store: async (req, res) => {

    try {
      const invoice = new Invoice(req.body);
      const savedInvoice = await invoice.save();
    
      res.status(201).json({
        status: true,
        message: 'Successfully created',
        data: savedInvoice
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        errors: err
      });
    }
   
    
  }
}