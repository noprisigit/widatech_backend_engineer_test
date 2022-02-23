module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    invoiceNo: {
      type: Sequelize.STRING
    },
    itemName: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    totalCogs: {
      type: Sequelize.INTEGER
    },
    totalPrice: {
      type: Sequelize.INTEGER
    }
  });

  return Product;
}