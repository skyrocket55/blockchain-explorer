const { faker } = require('@faker-js/faker');

class EthereumBlocks {
    constructor() {
        this.blockAddresses = [];
        this.blocks = [];
    }
    
    // return list of block addresses
    getAddresses = () => {
        // generate the ethreum addresses
        this.blockAddresses = Array.from({ length: 8 }, () => faker.finance.ethereumAddress());
        this.createEthereumBlocks(); // initialize the blocks
        return this.blockAddresses;
    }
    
    // create ethereum blocks with details - returns array
    createEthereumBlocks = () => {
        // // Map over the generated block addresses and populate the blocks array
        this.blockAddresses.forEach(blockAddress => {
            this.blocks.push({
                address: blockAddress,
                balance: faker.finance.amount(),
                gasUsed: faker.number.int({ min: 100, max: 1000 })
            });
        })
        
        return this.blocks;
    }
    
    // get block details by address id selected
    getDetail = (address) => {
        console.log(`getDetail blocks ${this.blocks}`);
        const blockDetails = this.blocks.find(block => block.address === address);
        console.log(`getDetail of address ${address}: ${JSON.stringify(blockDetails)} `);
        return blockDetails;
    }
}

module.exports = EthereumBlocks;