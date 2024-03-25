const express = require('express');
const router = express.Router();
// Import then Create an instance of Transactions Module
const TransactionsModule = require('../modules/transactionsModule');
const transactionsModule = new TransactionsModule();
// Pagination Helper
const PaginationUtil = require('../util/paginationUtil');
const paginationUtil = new PaginationUtil();

// GET endpoint to get transactions history
router.get('/history', async (req, res) => {
    // Destructure query parameters; Set default values to allow pagination if not added in client
    const { page = 1, size = 5 } = req.query;
    try {
        const transactions = await transactionsModule.getTransactionHistory(page, size);
        const responsePaginated = paginationUtil.getPaginatedData(transactions, page, size);
        res.status(200).json(responsePaginated);
        console.log(`${req.method} ${req.url}`);
    } catch (error) {
        res.status(500).json({
            message:
            error.message || "An error occurred while retrieving transactions history."
        });
    }
}); 

// POST endpoint to save transactions
router.post('/send', async (req, res) => {
    try {
        const { source, destination, amount } = req.body;
        console.log(`${req.method} ${req.url}`);
        const transactionCreated = await transactionsModule.sendTransfer(source, destination, amount);
        res.status(201).json(transactionCreated);    
    } catch (error) {
        res.status(500).json({
            message:
            error.message || "An error occurred while saving transactions."
        });
    }
});

module.exports = router;