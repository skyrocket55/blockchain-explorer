import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt, faCube } from '@fortawesome/free-solid-svg-icons';
import EthereumTransactions from '../data/EthereumTransactions';

function Dashboard() {
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
                                {EthereumTransactions.map((transaction, index) => (
                                    <React.Fragment key={index}>
                                        <div className='row text-truncate'>
                                            <div className='col-md-5 mb-2 col-12'>
                                                <FontAwesomeIcon icon={faReceipt} size='xl'/> &nbsp;
                                                From
                                                <p className="text-primary">{transaction.source.slice(0, 23)}</p> 
                                            </div>
                                            <div className='col-md-5 mb-2 col-12'>
                                                To 
                                                <p className="text-primary">{transaction.destination.slice(2, 23)}</p> 
                                            </div>
                                            <div className='col-md-2 mb-2 col-12'>
                                                Amount
                                                <p className="text-secondary">{transaction.amount}</p> 
                                            </div>
                                        </div>
                                        {index===(EthereumTransactions.length-1) ? <></> : <hr className="hr" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center justify-text-center">
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
                                    <div className='col-md-2 mb-5 col-12'>
                                        <FontAwesomeIcon icon={faCube} size='xl'/>
                                    </div>
                                    <div className='col-md-10 mb-5 col-12'>
                                        <p className="text-primary">19320088</p> 
                                    </div>
                                    <hr className="hr" />
                                </div>
                                <div className='row'>
                                    <div className='col-md-2 mb-5 col-12'>
                                        <FontAwesomeIcon icon={faCube} size='xl'/>
                                    </div>
                                    <div className='col-md-10 mb-5 col-12'>
                                        <p className="text-primary">19320087</p> 
                                    </div>
                                    <hr className="hr" />
                                </div>
                                <div className='row'>
                                    <div className='col-md-2 mb-5 col-12'>
                                        <FontAwesomeIcon icon={faCube} size='xl'/>
                                    </div>
                                    <div className='col-md-10 mb-4 col-12'>
                                        <p className="text-primary">19320086</p> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center justify-text-center">
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

export default Dashboard