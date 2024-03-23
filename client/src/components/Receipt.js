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
                    <th scope='col'>Source</th>
                    <th scope='col'>Destination</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Gas Used</th>
                    <th scope='col'>Receipt Hash</th>
                </tr>
            </thead>
            <tbody>
            {props && (
            <>    
                <tr>
                    <td width='20%'>{props.receiptDetails.source}</td>
                    <td width='20%'>{props.receiptDetails.destination}</td>
                    <td width='20%'>{props.receiptDetails.amount}</td>
                    <td width='20%'>{props.receiptDetails.gasUsed}</td>
                    <td width='20%'>{props.receiptDetails.receiptHash}</td>
                </tr>
            </>
            )}
            </tbody>
        </table>
      </div>
    );
  }

export default Receipt;