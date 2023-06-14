import React, { useState } from 'react';
import './addCard.css';
import { addNewCard } from '../services/usersService'

function AddCard() {
  const [cardTitle, setCardTitle] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleCardTitleChange = (event) => {
    setCardTitle(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardHolderChange = (event) => {
    setCardHolder(event.target.value);
  };

  const handleCardExpirationChange = (event) => {
    setCardExpiration(event.target.value);
  };

  const handleCardCvvChange = (event) => {
    setCardCvv(event.target.value);
  };

  const handleSaveCardClick = async event  => {
    event.preventDefault();

    const isAnyFieldEmpty = [cardTitle, cardNumber, cardHolder, cardExpiration, cardCvv].some(field => !field);
    if (isAnyFieldEmpty) {
      alert('Please fill all the details.');
      return;
    }
    let payload = {
        cardTitle, cardNumber, cardHolder, cardExpiration, cardCvv
    };
    await addNewCard(payload);
    setCardTitle(' ');
    setCardNumber(' ');
    setCardHolder(' ');
    setCardExpiration(' ');
    setCardCvv(' ');
  };

  return (
    <div className="add-card-container">
      <h2>Add Card</h2>
      <div className="form-container">
        <label>Card Title:</label>
        <input type="text" value={cardTitle} onChange={handleCardTitleChange} required />
        <label>Card Number:</label>
        <input type="number" value={cardNumber} onChange={handleCardNumberChange} required />
        <label>Card Holder Name:</label>
        <input type="text" value={cardHolder} onChange={handleCardHolderChange} required />
        <label>Card CVV:</label>
        <input type="number" value={cardCvv} onChange={handleCardCvvChange} required />
        <label>Expiration Date:</label>
        <input type="date" value={cardExpiration} onChange={handleCardExpirationChange} required />
        <br />
        <button onClick={handleSaveCardClick}>Save Card</button>
      </div>
    </div>
  );
}

export default AddCard;
