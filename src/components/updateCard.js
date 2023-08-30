import React, { useState, useEffect } from 'react';
import { getCardsData, updateCard } from '../services/usersService';
import './updateCard.css';

function UpdateCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCardsData();
        if (Array.isArray(response.cards)) {
          setData(response.cards);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const updateItem = async (item) => {
    try {
      const response = await updateCard(item);
      if (Array.isArray(response.cards)) {
        setData(response.cards);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      {data.map((item) => (
        <div key={item._id} className="field-container">
          <label className="field-label">Card Title:</label>
          <input className="field-input" type="text" value={item.cardTitle} required />
          <label className="field-label">Card Number:</label>
          <input className="field-input" type="number" value={item.cardNumber} required />
          <label className="field-label">Card Holder Name:</label>
          <input className="field-input" type="text" value={item.cardHolder} required />
          <label className="field-label">Card CVV:</label>
          <input className="field-input" type="number" value={item.cardCvv} required />
          <label className="field-label">Expiration Date:</label>
          <input className="field-input" type="date" value={item.cardExpiration} required />
          <br />
          <button onClick={() => updateItem(item)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default UpdateCard;
