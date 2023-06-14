const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardTitle: { type: String, required: true },
  cardNumber: { type: String, required: true, unique: true },
  cardHolder: { type: String, required: true },
  cardCvv: { type: String, required: true },
  cardExpiration: { type: Date, required: true },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
