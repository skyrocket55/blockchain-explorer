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

    // get transaction details from local hardhat node
    async getEthTransaction(fromAddress, toAddress, amount) {
        const provider =  ethers.provider;
        //const balanceWei = await provider.getBalance(address);
        // console.log("Balance in balanceWei:", balanceWei.toString());
        
        // transaction details to pass to HardhatEthersProvider
        const transaction = {
            from: fromAddress,
            // Get the first element that's not equal to the address param
            to: toAddress,
            value: amount // value cannot be in decimal
        };
        
        // Send transaction - to simulate pulled block & transaction from local hardhat instance
        const transactionHash = await provider.send("eth_sendTransaction", [transaction]);
        
        // Get transaction details
        const transactionDetails = await provider.getTransaction(transactionHash);
        // console.log('transaction details: ', transactionDetails);
        return transactionDetails;
    }
    
    // Get block details by address id selected
    async getDetail(address) {
        
        // get eth transaction details
        let transactionDetails = await this.getEthTransaction(address, this.accounts.find((account) => account.address !== address), faker.finance.amount({ min: 1, max: 500, dec: 0 }));

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