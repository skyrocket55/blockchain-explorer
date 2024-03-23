import React, { useState, useEffect } from 'react';
import BlockDetails from './BlockDetails';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import axios from "axios";

function Blocks() {
    // Use the state hook to manage selected address
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Use the state hook to manage selected block details
    const [selectedBlock, setSelectedBlock] = useState(null);

    // Use the state hook to manage list of ethereum addresses
    const [listOfAddresses, setListOfAddresses] = useState([]);

    // Use a flag to determine if it's the initial load
    const [initialLoad, setInitialLoad] = useState(true);

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

    // fetch from backend the block details
    useEffect(() => {
      if (!initialLoad) {
        axios.get(`http://localhost:3001/blocks/details/${selectedAddress}`)
          .then((response) => {
              setSelectedBlock(response.data);
          })
          .catch((error) => {
            console.error("Error on catching: ", error);
          });
        }
      }, [selectedAddress, initialLoad]); //Add selectedAddress to dependency array to re-run effect when it changes

    // handle change on selected address
    const handleOnChange = event => {
        const selectedValue = event.currentTarget.value;
        setSelectedAddress(selectedValue);
        console.log('SelectedAddres: ', selectedValue);
    };

    return (
    <div>
      <div className='card mt-3'>
        <div className='card-header'>
        <Header title="Blocks" margin="ml-2" icon={faCubes} size="xs"/>
        <hr className='hr'/>
        <div className='row text-center justify-content-center'>
            <select className="form-select mb-3" onChange={handleOnChange} value={selectedAddress || ''}>
                    <option value="" disabled>Select Ethereum Block</option>
                    {listOfAddresses.map(item => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
            </select>
        </div>
        </div>
        <div className='card-body'>
            {/* Use a conditional rendering to check if selectedBlock exists */}
            {selectedAddress === null ? (
                        // Render a message if no Ethereum address is selected
                        <p>Ethereum Address is Required</p>
            ) : (
                // Use a conditional rendering to check if selectedBlock exists
                selectedBlock ? (
                    <div className='row alert alert-info'>
                        <BlockDetails selectedBlock={selectedBlock} />
                    </div>
                ) : (
                    // Render a message if no block is found for the selected address
                    <p>No Block Details Found</p>
                )
            )}
        </div>
      </div>
    </div>
    )
};

export default Blocks;