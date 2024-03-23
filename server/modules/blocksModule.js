const { faker } = require('@faker-js/faker');

let blocks = [];
let blockAddresses = [];

// return list of block addresses
const getAddresses = () => {
    // generate the ethreum addresses
    blockAddresses = Array.from({ length: 8 }, () => faker.finance.ethereumAddress());
    return blockAddresses;
}

// create ethereum blocks with details - returns array
const createEthereumBlocks = () => {
    // // Map over the generated block addresses and populate the blocks array
    blockAddresses.forEach(blockAddress => {
        blocks.push({
            "address": blockAddress,
            "balance": faker.finance.amount(),
            "gasUsed": faker.number.int({ min: 100, max: 1000 })
        });
    })
    
    return blocks;
}

// get block details by address id selected
const getDetail = (address) => {
    const blocks = createEthereumBlocks();
    const blockDetails = blocks.find(block => block.address === address);
    console.log(`getDetail of address ${address}: ${JSON.stringify(blockDetails)} `);
    return blockDetails;
}

module.exports = { 
    getAddresses,
    createEthereumBlocks,
    getDetail
}