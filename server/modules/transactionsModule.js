// Transactions Model
const db = require('../models');
const TransactionsModel = db.transactions;
// Transactions Status Enum
const StatusEnum = require('../enums/statusEnum');
const { faker } = require('@faker-js/faker');
const SHA256 = require("crypto-js/sha256");
// Pagination Helper
const PaginationHelper = require('../util/paginationHelper');
const paginationHelper = new PaginationHelper();

class Transactions {
    
    // Get transaction list in DESC order
    // Optional params page and size - default values to allow pagination
    async getTransactionHistory(page, size) {
        try {
            const { limit, offset } = paginationHelper.getPagination(page, size);
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

    // Send transfer 
    async sendTransfer(source, destination, amount) {
        try {
            const createdTransaction = await TransactionsModel.create({
                source: source,
                destination: destination,
                amount: amount,
                status: StatusEnum.SUCCESSFUL,
                gasUsed: faker.number.int({ min: 100, max: 1000 }),
                receiptHash: SHA256(source + destination + amount).toString()
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