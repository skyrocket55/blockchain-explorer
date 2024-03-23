import React, { useState, useEffect } from 'react';
import Receipt from './Receipt';
import Header from './Header';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Transfer() {
  // Use the state hook to manage list of ethereum addresses
  const [listOfAddresses, setListOfAddresses] = useState([]);

  // Use a flag to determine if it's the initial load
  const [initialLoad, setInitialLoad] = useState(true);

  // Use the state hook to manage selected from/to Addresses, input amount and nonce(counter)
  const [selectedFromAddress, setSelectedFromAddress] = useState(null);
  const [selectedToAddress, setSelectedToAddress] = useState(null);
  const [inputAmount, setInputAmount] = useState(null);

  // handle receipt details and flag to show it
  const [receipt, setReceiptDetails] = useState({source: null, destination: null, amount: null, gasUsed: null, receiptHash: null});
  const [showReceipt, setShowReceipt] = useState(false);
  const [display, setDisplay] = useState({display: 'none'}); // validation div alerts

  // fetch from backend the list of ethereum addresses
  useEffect(() => {
    // Check if it's not the initial load
    if (!initialLoad) {
      axios.get("http://localhost:3001/blocks/addresses")
        .then((response) => {
          setListOfAddresses(response.data);
        })
        .catch((error) => {
          console.error("Error on catching: ", error);
        });
    } else {
      // Set initialLoad to false after the first load
      setInitialLoad(false);
    }
  }, [initialLoad]);

  // handle change on selected from address
  const handleOnChangeFromAddress = event => {
    const selectedFromValue = event.currentTarget.value;
    setSelectedFromAddress(selectedFromValue);
  };

  // handle change on selected to address
  const handleOnChangeToAddress = event => {
    const selectedToValue = event.currentTarget.value;
    setSelectedToAddress(selectedToValue);
  };

  // handle change on input amount
  const handleOnChangeAmount = event => {
    const amount = event.currentTarget.value;
    setInputAmount(amount);
  };

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); //prevent form submission
    
    // Request body
    const requestBody = {
      source: selectedFromAddress,
      destination: selectedToAddress,
      amount: parseFloat(inputAmount)
    };

  // POST request on Transactions
    axios.post("http://localhost:3001/transactions/send", requestBody)
      .then((response) => {
        // Upon successful response, set the receipt details
        setReceiptDetails({
          source: response.data.source,
          destination: response.data.destination,
          amount: response.data.amount,
          gasUsed: response.data.gasUsed,
          receiptHash: response.data.receiptHash,
        });
        // Show the receipt
        setShowReceipt(true);
      })
      .catch((error) => {
        console.error("Error on catching: ", error);
      });
    
    // Check Input Fields Validations to show receipt
    inputAmount!==null && selectedFromAddress!==null && selectedToAddress!==null && selectedFromAddress!==selectedToAddress
    ? setShowReceipt(true) : setDisplay({display: 'block'});
  };

  // reset all input
  const handleCancel = () => {
    setSelectedFromAddress(null);
    setSelectedToAddress(null);
    setInputAmount(null);
    setShowReceipt(false);
    // Hide validation messages
    setDisplay({display: 'none'});
  };

  return (
    <div className='card mt-3 mb-3'>
      <div className='card-header'>
        <Header title="Transfers" margin="ml-2" icon={faMoneyBillTransfer} size="xs"/>
        <hr className='hr'/>
        <h5>From Address</h5>
        <form onSubmit={handleSubmit}>
          <div className='row text-center justify-content-center'>
              <select className="form-select mb-3" onChange={handleOnChangeFromAddress} value={selectedFromAddress || ''}>
                      <option value="" disabled>Select From Address</option>
                      {listOfAddresses.map(item => (
                          <option key={item} value={item}>
                              {item}
                          </option>
                      ))}
              </select>
              {/* Conditional Rendering of Required Fields */}
              {selectedFromAddress===null && !showReceipt && (
                <div className="alert alert-danger mt-1" role="alert" id="validations" style={display}>
                  Source Account is required.
                </div>
              )}
          </div>
          <h5>To Address</h5>
          <div className='row text-center justify-content-center'>
              <select className="form-select mb-3" onChange={handleOnChangeToAddress} value={selectedToAddress || ''}>
                      <option value="" disabled>Select To Address</option>
                      {listOfAddresses.map(item => (
                          <option key={item} value={item}>
                              {item}
                          </option>
                      ))}
              </select>
              {/* Conditional Rendering of Required Fields */}
              {selectedToAddress===null && !showReceipt && (
                <div className="alert alert-danger mt-1" role="alert" id="validations" style={display}>
                  Destination Account is required.
                </div>
              )}
              {/* Ensure that the address transferring to is different from the source */}
              {selectedToAddress!==null && selectedFromAddress===selectedToAddress && (
                <div className="alert alert-danger mt-1" role="alert" id="validations" style={display}>
                  Destination Account cannot be the same with Source Account.
                </div>
              )}
          </div>
          <h5>Amount</h5>
          <div className='row text-center justify-content-center'>
            <input className='form-control' 
                  type='number' 
                  placeholder='Transfer Amount'
                  onChange={handleOnChangeAmount} 
                  value={inputAmount || ''}
            />
            {/* Conditional Rendering of Required Fields */}
            {inputAmount===null && !showReceipt && (
              <div className="alert alert-danger mt-1" role="alert" id="validations" style={display}>
                Input Amount is required.
              </div>
            )}
          </div>
          <div className='row text-center justify-content-center mt-3'>
            <button type='submit' className='btn btn-outline-primary' disabled={showReceipt}>Submit</button>
          </div>
          <div className='row text-center justify-content-center mt-3'>
            <button type='button' className='btn btn-outline-secondary' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>

      <div className='card-body'>
          {/* Use oncditional rendering to show the receipt details */}
          {receipt && showReceipt && 
          <div className='row alert alert-info'>
            <Receipt receiptDetails={receipt}/>
          </div>
          }
      </div>
    </div>
  )
};

export default Transfer;