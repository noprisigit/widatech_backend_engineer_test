const ObjectId = require("mongoose").Types.ObjectId;
const moment = require("moment");
const Invoice = require("../models/Invoice");
const Product = require("../models/Product");

module.exports = {
  index: async (req, res) => {
    const result = {};

    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 5;
    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    let invoices;
    let array = [];
    let query = {};

    if (req.query.date) {
      query.date = {
        $gte: new Date(req.query.date),
        $lt: new Date(req.query.date),
      };
    }

    if (query) {
      invoices = await Invoice.find(query);
    } else {
      invoices = await Invoice.find();
    }

    if (endIndex < invoices.length) {
      result.next = {
        page: page + 1,
        size: size
      }
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        size: size
      }
    }

    const arrTemp = invoices.slice(startIndex, endIndex);

    for (let i = 0; i < arrTemp.length; i++) {
      let products = [];

      const temp = arrTemp[i].listOfProductsSold;
      let totalProfit = 0;
      let totalCostOfGoodsSold = 0;
      let totalPriceSold = 0;
      for (let j = 0; j < temp.length; j++) {
        const product = await Product.findById(temp[j]);
        totalCostOfGoodsSold += product.totalCostOfGoodsSold;
        totalPriceSold += product.totalPriceSold;
        products.push(product);
      }

      totalProfit = totalPriceSold - totalCostOfGoodsSold;

      array.push({
        _id: invoices[i]._id,
        invoiceNo: invoices[i].invoiceNo,
        date: invoices[i].date,
        customerName: invoices[i].customerName,
        salesPersonName: invoices[i].salesPersonName,
        paymentType: invoices[i].paymentType,
        notes: invoices[i].notes,
        totalProfit: totalProfit,
        totalTransaction: totalPriceSold,
        listOfProductsSold: products,
      });
    }

    result.results = array;

    res.json({
      status: true,
      data: result,
    });
  },
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
      res.status(400).json({
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
          data: [],
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
              listOfProductsSold: req.body.listOfProductsSold,
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
      res.status(400).json({
        status: false,
        message,
      });
    }
  },

  destroy: async (req, res) => {
    try {
      const invoice = await Invoice.findById({ _id: req.params.id });

      if (!invoice) {
        res.status(404).json({
          status: false,
          message: "Data not found",
          data: [],
        });
      } else {
        await invoice.remove();

        res.json({
          status: true,
          message: "Successfully deleted",
          data: invoice,
        });
      }
    } catch (err) {
      const message = err.message;
      res.status(400).json({
        status: false,
        message,
      });
    }
  },
};
