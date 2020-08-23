const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  time: Number,
  'MP/h': Number,
  'Ammo/h': Number,
  'Rations/h': Number,
  'Part/h': Number,
  'Doll Ticket/h': Number,
  'Equip Ticket/h': Number,
  'Quick Build/h': Number,
  'Quick Repair/h': Number,
  'Token/h': Number,
});

module.exports = model('Logistic', schema);
