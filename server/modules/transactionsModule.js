// Transactions Model
const db = require('../models');
const TransactionsModel = db.transactions;
const StatusEnum = require('../enums/statusEnum');
const { faker } = require('@faker-js/faker');
const SHA256 = require("crypto-js/sha256");

class Transactions {
    constructor() {
        // Initialize a mock receipt
        this.receipt = {
            source: null,
            destination: null,
            amount: null,
            gasUsed: null,
            receiptHash: null
        };
    }

    // Get transaction list in DESC order
    // Optional params page and size - default values to allow pagination
    async getTransactionHistory(page, size) {
        const { limit, offset } = this.getPagination(page, size);
        const transactions = await TransactionsModel.findAndCountAll({
            order: [['createdAt', 'DESC']], // Order by createdAt in descending order
            limit, // size or num of records per page
            offset, // page * size
        })
        return transactions; 
    }

    // Send transfer 
    async sendTransfer(source, destination, amount) {
        const createdTransaction = await TransactionsModel.create({
            source: source,
            destination: destination,
            amount: amount,
            status: StatusEnum.SUCCESSFUL,
            gasUsed: faker.number.int({ min: 100, max: 1000 }),
            receiptHash: SHA256(source + destination + amount).toString()
        });

        // Update the mock receipt
        this.receipt = {
            source: source,
            destination: destination,
            amount: amount,
            gasUsed: createdTransaction.gasUsed,
            receiptHash: createdTransaction.receiptHash
        };

        return this.receipt;
    }

    // Get Transactions List with Pagination
    getPaginatedData = (data, page, limit) => {
        const { count: totalItems, rows: transactions } = data;
        const currentPage = page ? +page : 1; // default page 1
        const totalPages = Math.ceil(totalItems / limit);
      
        return { totalItems, transactions, totalPages, currentPage };
    };

    // Paging params with default values if client did not specify as params
    getPagination = (page, size) => {
        const limit = size ? +size : 5;
        // Sequelize starts counting from 0 - fix to correct the currentPage result
        const offset = page ? (page - 1) * limit : 0;
      
        return { limit, offset };
    };
}

module.exports = Transactions;