import React, { useState, useEffect } from 'react';
import { getCardsData, updateCard } from '../services/usersService';

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
    <div>
      {data.map((item) => (
        <div key={item._id} style={{ display: 'flex', alignItems: 'center' }}>
        <label>Card Title:</label>
        <input type="text" value={item.cardTitle}  required />
        <label>Card Number:</label>
        <input type="number" value={item.cardNumber}  required />
        <label>Card Holder Name:</label>
        <input type="text" value={item.cardHolder}  required />
        <label>Card CVV:</label>
        <input type="number" value={item.cardCvv}  required />
        <label>Expiration Date:</label>
        <input type="date" value={item.cardExpiration}  required />
        <br/>
        <button onClick={() => updateItem(item)}>Update</button>
      </div>
      ))}
    </div>
  );
}

export default UpdateCard;
