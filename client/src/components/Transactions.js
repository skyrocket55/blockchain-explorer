import React from 'react'
import Header from './Header';
import EthereumTransactions from '../data/EthereumTransactions';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';

function Transactions() {
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
                  {EthereumTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td width='20%'>{transaction.source}</td>
                      <td width='20%'>{transaction.destination}</td>
                      <td width='10%'>{transaction.amount}</td>
                      <td width='15%'>{transaction.status}</td>
                      <td width='15%'>{transaction.gasUsed}</td>
                      <td width='20%'>{transaction.receiptHash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>  
        </div>
      </div>
  );
}

export default Transactions;