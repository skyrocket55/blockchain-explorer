import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

const EthereumAddresses = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const newAddresses = Array.from({ length: 8 }, () => faker.finance.ethereumAddress());
    setAddresses(newAddresses);
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return addresses;
};

 export default EthereumAddresses;