import React from 'react';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

function BlockDetails({ selectedBlock }) {
    
    return (
      <div className='table-responsive text-center justify-content-center'>
        <Header title="Block Details" margin="ml-2" icon={faFileInvoice} size="xs"/>
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>Block Number</th>
                    <th scope='col'>Block Hash</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Balance</th>
                    <th scope='col'>Gas Used</th>
                </tr>
            </thead>
            <tbody>
            {selectedBlock && (
            <>    
                <tr>
                    <td width='20%'>{selectedBlock.blockNumber}</td>
                    <td width='20%'>{selectedBlock.blockHash}</td>
                    <td width='20%'>{selectedBlock.address}</td>
                    <td width='20%'>{selectedBlock.balance}</td>
                    <td width='20%'>{selectedBlock.gasUsed}</td>
                </tr>
            </>
            )}
            </tbody>
        </table>
      </div>
    );
  }

export default BlockDetails;