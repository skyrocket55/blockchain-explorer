const { faker } = require('@faker-js/faker');
const { ethers } = require('hardhat');

class EthereumBlocks {

    constructor() {
        this.accounts = [];
        this.blockDetails = { address: null, balance: null, gasUsed: null };
    }
    
    // return list of eth accounts from hardhat instance
    async getAddresses() {
        const provider = ethers.provider;
        this.accounts = await provider.send("eth_accounts", []);
        return this.accounts;
    }
    
    // Get block details by address id selected
    async getDetail(address) {
        const provider =  ethers.provider;
        //const balanceWei = await provider.getBalance(address);
        // console.log("Balance in balanceWei:", balanceWei.toString());
        
        // transaction details to pass to HardhatEthersProvider
        const transaction = {
            from: address,
            // Get the first element that's not equal to the address param
            to: this.accounts.find((account) => account.address !== address),
            value: faker.finance.amount({ min: 1, max: 500, dec: 0 }) // value cannot be in decimal
        };
        
        // Send transaction - to simulate pulled block & transaction from local hardhat instance
        const transactionHash = await provider.send("eth_sendTransaction", [transaction]);
        
        // Get transaction receipt
        //const receipt = await provider.getTransactionReceipt(transactionHash);
        // console.log('transaction receipt: ', receipt);
        
        // Get transaction details
        const transactionDetails = await provider.getTransaction(transactionHash);
        // console.log('transaction details: ', transactionDetails);

         // create block details from fetched transaction details
         this.blockDetails.blockNumber = transactionDetails.blockNumber;
         this.blockDetails.blockHash = transactionDetails.blockHash;
         this.blockDetails.address = transactionDetails.from;
         this.blockDetails.balance = transactionDetails.value.toString(); // fix TypeError
         // convert wei to ether
         this.blockDetails.gasUsed = ethers.formatEther(transactionDetails.gasPrice);

        return this.blockDetails;
    }
}

module.exports = EthereumBlocks;