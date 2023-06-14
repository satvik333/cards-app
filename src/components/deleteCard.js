import React, { useState, useEffect } from 'react';
import { getCardsData, deleteCard } from '../services/usersService';

function DeleteCard() {
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

  const deleteItem = async (item) => {
    try {
        const response = await deleteCard(item._id);
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
        <div key={item._id} style={{ display: 'flex', alignItems: 'center', marginLeft: '45%' }}>
          <h1>{item.cardTitle}</h1>
          <button onClick={() => deleteItem(item)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default DeleteCard;
