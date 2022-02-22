const Invoice = require("../models/Invoice");

module.exports = {
  store: async (req, res) => {
    try {
      const invoice = new Invoice(req.body);
      const savedInvoice = await invoice.save();

      res.status(201).json({
        status: true,
        message: "Successfully created",
        data: savedInvoice,
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        errors: err,
      });
    }
  },

  update: async (req, res) => {
    try {
      const invoice = await Invoice.findById({ _id: req.params.id });

      if (!invoice) {
        res.status(404).json({
          status: false,
          message: "Data not found",
          data: quote,
        });
      } else {
        await Invoice.updateOne(
          { _id: req.params.id },
          {
            $set: {
              invoiceNo: req.body.invoiceNo,
              date: req.body.date,
              customerName: req.body.customerName,
              salesPersonName: req.body.salesPersonName,
              paymentType: req.body.paymentType,
              notes: req.body.notes,
              listOfProductsSold: req.body.listOfProductsSold
            },
          }
        );

        const invoice = await Invoice.findById({ _id: req.params.id });
        res.status(201).json({
          status: true,
          message: "Successfully updated",
          data: invoice,
        });
      }
    } catch (err) {
      const message = err.message;
      res.json({
        status: false,
        message,
      });
    }
  },
};
