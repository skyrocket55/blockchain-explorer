import React, { useState, useEffect } from 'react';
import Header from './Header';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Transactions() {
  // Use the state hook to manage list of Transactions
  const [listOfTransactions, setListOfTransactions] = useState([]);

  // Use the state hook to manage the Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size

  useEffect(() => {
    fetchTransactionsHistory();
  }, [currentPage, pageSize]); // Trigger the effect when currentPage or pageSize changes

  // Fetch Transactions History with Pagination
  const fetchTransactionsHistory = () => {
    axios.get(`http://localhost:3001/transactions/history?page=${currentPage}&size=${pageSize}`)
      .then((response) => {
        const { totalItems, transactions } = response.data;
        setTotalPages(Math.ceil(totalItems / pageSize));
        setListOfTransactions(transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions: ", error);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1); // Reset currentPage when pageSize changes to go back to the first page
  };

  return (
    <div className='card mt-3'>
        <div className='card-header'>
          <Header title="Transactions" margin="ml-2" icon={faReceipt} size="xs"/>
        </div>
        <div className='card-body text-center justify-content-center'>
          <div className='row alert alert-info'>
            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Source</th>
                    <th scope='col'>Destination</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Gas Used</th>
                    <th scope='col'>ReceiptHash</th>
                  </tr>
                </thead>
                <tbody>
                {listOfTransactions.length > 0 ? (
                  listOfTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td width='20%'>{transaction.source}</td>
                      <td width='20%'>{transaction.destination}</td>
                      <td width='10%'>{transaction.amount}</td>
                      <td width='15%'>{transaction.status}</td>
                      <td width='15%'>{transaction.gasUsed}</td>
                      <td width='20%'>{transaction.receiptHash}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No transactions available</td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
              <div className="mb-2">
                <button onClick={handlePrevPage} disabled={currentPage === 1} type='submit' className='btn btn-outline-primary'>
                  Previous Page
                </button>
                <span className="mx-2"> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} type='submit' className='btn btn-outline-primary'>
                  Next Page
                </button>
              </div>
              <div className='mb-2'>
                <span>Show Rows:</span>
                <select value={pageSize} onChange={handlePageSizeChange} className='form-select ml-3'>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
          </div>  
        </div>
      </div>
  );
}

export default Transactions;