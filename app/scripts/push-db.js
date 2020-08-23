/* eslint-disable no-console */
// To use script run 'node push-db.js'. Before that, place your files in push-data directory.
const mongoose = require('mongoose');
const fs = require('fs');
const logisticModel = require('../models/Logistic');
const dbURL = require('../dbAccess');

const db = mongoose.connection;

const newLogistics = [];

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

fs.readdirSync('../../push-data').forEach((file) => {
  const dataToPush = JSON.parse(fs.readFileSync(`../../push-data/${file}`))
    .logistics;
  newLogistics.push(...dataToPush);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  logisticModel.insertMany(newLogistics, (err, res) => {
    console.log('err: ', err);
    console.log('result: ', res);
    db.close();
  });
});
