const express = require('express');
const db = require('./models');
const invoiceRoute = require('./routes/invoice');
const productRoute = require('./routes/product');

const app = express();

global.__basedir = __dirname;

app.use(express.urlencoded({extended: true}));

invoiceRoute(app);
productRoute(app);

db.sequelize.sync();

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
