module.exports = (sequelize, Sequelize) => {
  const Invoice = sequelize.define("invoice", {
    invoiceNo: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    customerName: {
      type: Sequelize.STRING
    },
    salesPersonName: {
      type: Sequelize.STRING
    },
    paymentType: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
    }
  });

  return Invoice;
}