import { faker } from '@faker-js/faker';

const EthereumBlocks = (generatedAddresses) => {
  let blocks = [];

   // Map over the generated addresses and populate the blocks array
   generatedAddresses.forEach(address => {
    blocks.push({
      "address": address,
      "balance": faker.finance.amount(),
      "gasUsed": faker.number.int({ min: 100, max: 1000 })
    });
  });

  // Return the populated blocks array
  return blocks;
};

export default EthereumBlocks;