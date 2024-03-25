// Transactions Model
const db = require('../models');
const TransactionsModel = db.transactions;
// Transactions Status Enum
const StatusEnum = require('../enums/statusEnum');
const { faker } = require('@faker-js/faker');
const SHA256 = require("crypto-js/sha256");
// Pagination Helper
const PaginationUtil = require('../util/paginationUtil');
const paginationUtil = new PaginationUtil();
// Fetch Eth Transactions
const BlocksModule = require('../modules/blocksModule');
const blocksModule = new BlocksModule();
const { ethers } = require('hardhat');

class Transactions {
    // Get transaction list in DESC order
    // Optional params page and size - default values to allow pagination
    async getTransactionHistory(page, size) {
        try {
            const { limit, offset } = paginationUtil.getPagination(page, size);
            const transactions = await TransactionsModel.findAndCountAll({
                order: [['createdAt', 'DESC']], // Order by createdAt in descending order
                limit, // size or num of records per page
                offset, // page * size
            });
            return transactions; 
        } catch (error) {
            throw new Error(`Error getting transaction history: ${error.message}`);
        }
    }

    // Send transfer - using HardhatEthersProvider eth_sendTransaction
    async sendTransfer(source, destination, amount) {
        try {
            // fetch transaction details from local hardhat node
            let transactionDetails = await blocksModule.getEthTransaction(source, destination, amount);
            
            // save transactions to DB
            const createdTransaction = await TransactionsModel.create({
                source: transactionDetails.from,
                destination: transactionDetails.to,
                amount: transactionDetails.value.toString(),
                status: StatusEnum.SUCCESSFUL,
                gasUsed: ethers.formatEther(transactionDetails.gasPrice),
                receiptHash: transactionDetails.hash
            });

            // Create the mock receipt
            const receipt = {
                source: source,
                destination: destination,
                amount: amount,
                gasUsed: createdTransaction.gasUsed,
                receiptHash: createdTransaction.receiptHash
            };

            return receipt;
        } catch (error) {
            throw new Error(`Error sending transfer: ${error.message}`);
        }
    }
}

module.exports = Transactions;