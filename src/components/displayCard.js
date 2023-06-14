import React, { useState, useEffect } from 'react';
import { getCardsData } from '../services/usersService';

function DisplayCard() {
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

  return (
    <div>
      {data.map((item) => (
        <div key={item._id}>
          <h1>{item.cardTitle}</h1>
          <p>Card Number: {item.cardNumber}</p>
          <p>Card Holder: {item.cardHolder}</p>
          <p>Card Expiration: {item.cardExpiration}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayCard;
