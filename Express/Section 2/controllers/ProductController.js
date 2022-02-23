const db = require("../models");
const Product = db.product;
const Invoice = db.invoice;
const readXlsxFile = require("read-excel-file/node");

module.exports = {
  upload: async (req, res) => {
    try {
      if (req.file === undefined) {
        return res.status(400).send("Please upload an excel file");
      }

      let path = __basedir + "/uploads/" + req.file.filename;

      readXlsxFile(path, { sheet: 2 }).then(async (rows) => {
        rows.shift();

        let inputs = [];
        let errors = [];

        for (let i = 0; i < rows.length; i++) {
          const invoiceData = await Invoice.findAll({
            where: {
              invoiceNo: rows[i][0],
            },
          });

          if (
            Object.keys(invoiceData).length > 0 &&
            rows[i][1] !== null &&
            rows[i][2] !== null &&
            rows[i][3] !== null &&
            rows[i][4] !== null
          ) {
            let data = {
              invoiceNo: rows[i][0],
              itemName: rows[i][1],
              quantity: rows[i][2],
              totalCogs: rows[i][3],
              totalPrice: rows[i][4],
            };
            inputs.push(data);
          } else {
            let error = {
              invoiceNo: rows[i][0],
              itemName: rows[i][1],
              quantity: rows[i][2],
              totalCogs: rows[i][3],
              totalPrice: rows[i][4],
            };

            errors.push(error);
          }
        }

        Product.bulkCreate(inputs)
          .then(() => {
            res.status(201).json({
              status: true,
              message: "Uploaded the file successfully",
              data: inputs,
              errors: errors,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
    } catch (err) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  },
};
