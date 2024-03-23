import React, { useState, useEffect } from 'react';
import Header from './Header';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Transactions() {
  // Use the state hook to manage list of Transactions
  const [listOfTransactions, setListOfTransactions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; // Default

  useEffect(() => {
    fetchTransactionsHistory();
  }); // Fetch transactions when currentPage changes

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
            <div>
              <button onClick={handlePrevPage} disabled={currentPage === 1} type='submit' className='btn btn-outline-primary'>
                Previous Page
              </button>
                <span> Page {currentPage} of {totalPages} </span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages} type='submit' className='btn btn-outline-primary'>
                Next Page
              </button>
          </div>
          </div>  
        </div>
      </div>
  );
}

export default Transactions;