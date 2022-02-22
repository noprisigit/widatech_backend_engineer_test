const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const app = express();

// Connection into MongoDB
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;
db.once('open', () => {
  console.info(`Connected to MongoDB Database...`);
});

// Middlewares
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT;
app.listen(port, console.info(`Listening on http://localhost:${port}`));