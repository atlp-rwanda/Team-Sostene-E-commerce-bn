// This is where routers will be

// tip:
/**
 * 
 * A route is a section of Express code that 
 * associates an HTTP verb ( GET , POST , PUT , DELETE , etc.),
 * a URL path/pattern, and a function that is called to handle that pattern
 * 
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
// const { sequelize } = require('./config/db_connect');

app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT, () => {
  console.log('Server has started!');
});

module.exports = app;