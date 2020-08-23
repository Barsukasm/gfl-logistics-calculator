/* eslint-disable no-console */
const mongoose = require('mongoose');
const fs = require('fs');
const logisticModel = require('../models/Logistic');

const db = mongoose.connection;

const dbURL = 'mongodb+srv://gachaAPI:jXpOpNgWFjmRac8O@gachadatacluster.pm0gk.mongodb.net/gflData';
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
