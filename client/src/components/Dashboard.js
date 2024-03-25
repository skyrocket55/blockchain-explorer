import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faCube } from '@fortawesome/free-solid-svg-icons';
import EthereumTransactions from '../data/EthereumTransactions';
import axios from "axios";

function Dashboard() {
  // Use the state hook to manage list of Transactions
  const [listOfTransactions, setListOfTransactions] = useState([]);
  
  useEffect(() => {
    fetchTransactionsHistory();
  }, []); // Trigger the effect on page reload

  // Show the 5 Most Recent Transactions History on Dashboard
  const fetchTransactionsHistory = () => {
    axios.get(`http://localhost:3001/transactions/history?page=${1}&size=${5}`)
      .then((response) => {
        const { transactions } = response.data;
        setListOfTransactions(transactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions: ", error);
      });
  };

  // Function to convert timestamp wuth current locale
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div>
        <div className="row mt-3">
            <div className="col-md-8 mb-3">
                <div className="card border-info ">
                    <div className="card-body">
                        <h5 className="card-title">Latest Transactions</h5>

                        {/* Nested Child Card */}
                        <div className="card">
                            <div className="card-body">
                                {listOfTransactions.length > 0 ? (
                                    listOfTransactions.map((transaction, index) => (
                                        <React.Fragment key={index}>
                                            <div className='row text-truncate'>
                                                <div className='col-md-4 mb-1 col-12'>
                                                    <FontAwesomeIcon icon={faReceipt} size='xl'/> &nbsp;
                                                    From
                                                    <p className="text-primary">{transaction.source.slice(0, 15)}...</p> 
                                                </div>
                                                <div className='col-md-4 mb-1 col-12'>
                                                    To 
                                                    <p className="text-primary">{transaction.destination.slice(0, 15)}...</p> 
                                                </div>
                                                <div className='col-md-4 mb-1 col-12'>
                                                    Timestamp
                                                    <p className="text-secondary">{formatTimestamp(transaction.createdAt)}</p> 
                                                </div>
                                            </div>
                                            {index===(listOfTransactions.length-1) ? <></> : <hr className="hr" />}
                                        </React.Fragment>
                                    ))
                                ) : (
                                <div>
                                    No transactions available
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center justify-content-center">
                        <a href="/transactions" className="link-primary" style={{ textDecoration: 'none' }}>
                            View All Transactions
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-info ">
                    <div className="card-body">
                        <h5 className="card-title">Latest Blocks</h5>

                        {/* Nested Child Card */}
                        <div className="card">
                            <div className="card-body">
                                <div className='row'>
                                    {listOfTransactions.length > 0 ? (
                                        EthereumTransactions.map((transaction, index) => (
                                            <React.Fragment key={index}>
                                                <div className='col-md-2 mb-3 col-12'>
                                                    <FontAwesomeIcon icon={faCube} size='xl'/>
                                                </div>
                                                <div className='col-md-10 mb-3 col-12'>
                                                    <p className="text-primary">{transaction.blockHash}</p> 
                                                </div>
                                                {index===(EthereumTransactions.length-1) ? <></> : <hr className="hr" />}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                    <div>
                                        No transactions available
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center justify-content-center">
                        <a href="/blocks" className="link-primary" style={{ textDecoration: 'none' }}>
                            View Blocks
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;