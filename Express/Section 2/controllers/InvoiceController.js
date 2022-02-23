const db = require("../models");
const Invoice = db.invoice;
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file");
    }

    let path = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(path).then(async (rows) => {
      // skip header
      rows.shift();

      let inputs = [];
      let errors = [];

      for (let i = 0; i < rows.length; i++) {
        const invoiceData = await Invoice.findAll({
          where: {
            invoiceNo: rows[i][0],
            customerName: rows[i][2]
          },
        }).then(result => {
          return result;
        });

        if (
          invoiceData == 0 &&
          rows[i][1] != null &&
          rows[i][2] != null &&
          rows[i][3] != null &&
          (rows[i][4] == "CASH" || rows[i][4] == "CREDIT")
        ) {
          let invoice = {
            invoiceNo: rows[i][0],
            date: rows[i][1],
            customerName: rows[i][2],
            salesPersonName: rows[i][3],
            paymentType: rows[i][4],
            notes: rows[i][5],
          };

          inputs.push(invoice);
        } else {
          let error = {
            invoiceNo: rows[i][0],
            date: rows[i][1],
            customerName: rows[i][2],
            salesPersonName: rows[i][3],
            paymentType: rows[i][4],
            notes: rows[i][5],
          };

          errors.push(error);
        }
      }

      Invoice.bulkCreate(inputs)
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = { upload };
