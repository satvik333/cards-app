import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './content.css';
import { getCardsData } from '../services/usersService';

function Content({ isOpen }) {
  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [paginationPageSize, setPaginationPageSize] = useState(10);
  const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  const [paginationTotalPages, setPaginationTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCardsData();
        if (Array.isArray(response.cards)) {
          setData(response.cards);
          setPaginationTotalPages(Math.ceil(response.cards.length / paginationPageSize));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [paginationPageSize]);

  const onGridReady = (params) => {
    setGridApi(params.api);

    const firstPageData = data.slice(0, paginationPageSize);
    params.api.setRowData(firstPageData);
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    gridApi.setQuickFilter(event.target.value);
  };

  const onPageChange = (newPage) => {
    setPaginationCurrentPage(newPage);
    const startIndex = (newPage - 1) * paginationPageSize;
    const pageData = data.slice(startIndex, startIndex + paginationPageSize);
    gridApi.setRowData(pageData);
  };

  const columnDefs = [
    { headerName: 'Card Title', field: 'cardTitle', filter: true },
    { headerName: 'Card Number', field: 'cardNumber', filter: true },
    { headerName: 'Card Holder', field: 'cardHolder', filter: true },
    { headerName: 'Card CVV', field: 'cardCvv', filter: true },
    { headerName: 'Card Expiration', field: 'cardExpiration', filter: true },
  ];

  return (
    <div className={`content ${isOpen ? 'shifted' : ''} ag-theme-alpine`} style={{ height: '400px', width: '100%' }}>
      <h2>Records Count: <span>{data.length}</span></h2>
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
        rowData={data.slice((paginationCurrentPage - 1) * paginationPageSize, paginationCurrentPage * paginationPageSize)}
        onGridReady={onGridReady}
      />
      <div className="pagination-controls">
        <button disabled={paginationCurrentPage === 1} onClick={() => onPageChange(paginationCurrentPage - 1)}>
          Previous
        </button>
        <span>Page {paginationCurrentPage} of {paginationTotalPages}</span>
        <button disabled={paginationCurrentPage === paginationTotalPages} onClick={() => onPageChange(paginationCurrentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Content;
