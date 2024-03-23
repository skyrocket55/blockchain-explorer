import React from 'react';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

function Receipt(props) {
    
    return (
      <div className='table-responsive mt-3 text-center justify-content-center'>
        <Header title="Receipt Details" margin="ml-2" icon={faReceipt} size="xs"/>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Transaction Hash</th>
                    <th scope='col'>Block Hash</th>
                    <th scope='col'>Block Number</th>
                    <th scope='col'>From Address</th>
                    <th scope='col'>To Address</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Gas Used</th>
                </tr>
            </thead>
            <tbody>
            {props && (
            <>    
                <tr>
                    <td width='20%'>{props.receiptDetails.transactionHash}</td>
                    <td width='20%'>{props.receiptDetails.blockHash}</td>
                    <td width='10%'>{props.receiptDetails.blockNumber}</td>
                    <td width='15%'>{props.receiptDetails.fromAddress}</td>
                    <td width='15%'>{props.receiptDetails.toAddress}</td>
                    <td width='10%'>{props.receiptDetails.amount}</td>
                    <td width='10%'>{props.receiptDetails.gasUsed}</td>
                </tr>
            </>
            )}
            </tbody>
        </table>
      </div>
    );
  }

export default Receipt;