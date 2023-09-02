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

  const updateItem = async (item, updatedField, updatedValue) => {
    try {
      const updatedItem = {
        ...item,
        [updatedField]: updatedValue,
      };

      const response = await updateCard(updatedItem);

      if (Array.isArray(response.cards)) {
        setData(response.cards);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      {data.map((item) => (
        <div key={item._id} className="field-container">
          <label className="field-label">Card Title:</label>
          <input
            className="field-input"
            type="text"
            value={item.cardTitle}
            onChange={(e) => updateItem(item, 'cardTitle', e.target.value)}
            required
          />
          <label className="field-label">Card Number:</label>
          <input
            className="field-input"
            type="number"
            value={item.cardNumber}
            onChange={(e) => updateItem(item, 'cardNumber', e.target.value)}
            required
          />
          <label className="field-label">Card Holder Name:</label>
          <input
            className="field-input"
            type="text"
            value={item.cardHolder}
            onChange={(e) => updateItem(item, 'cardHolder', e.target.value)}
            required
          />
          <label className="field-label">Card CVV:</label>
          <input
            className="field-input"
            type="number"
            value={item.cardCvv}
            onChange={(e) => updateItem(item, 'cardCvv', e.target.value)}
            required
          />
          <label className="field-label">Expiration Date:</label>
          <input
            className="field-input"
            type="date"
            value={item.cardExpiration}
            onChange={(e) => updateItem(item, 'cardExpiration', e.target.value)}
            required
          />
          <br />
          <button onClick={() => updateItem(item)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default UpdateCard;
