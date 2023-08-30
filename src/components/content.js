import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './content.css';
import React, { useState, useEffect } from 'react';
import { getCardsData } from '../services/usersService';

function Content({ isOpen }) {
  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchText, setSearchText] = useState('');

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

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  const columnDefs = [
    { headerName: 'Card Title', field: 'cardTitle', filter: true },
    { headerName: 'Card Number', field: 'cardNumber', filter: true },
    { headerName: 'Card Holder', field: 'cardHolder', filter: true },
    { headerName: 'Card CVV', field: 'cardCvv', filter: true },
    { headerName: 'Card Expiration', field: 'cardExpiration', filter: true },
  ];

  const rowData = data;

  return (
    <div className={`content ${isOpen ? 'shifted' : ''} ag-theme-alpine`} style={{ height: '400px', width: '100%' }}>
      <h2>Records Count: <span>{rowData.length}</span></h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={onSearchTextChange}
        />
      </div>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onGridReady={onGridReady}
      />
    </div>
  );
}

export default Content;
