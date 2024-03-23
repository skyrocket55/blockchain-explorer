const express = require('express');
const router = express.Router();
// Destructure the functions from the import
const { getAddresses, getDetail, createEthereumBlocks } = require('../modules/blocksModule');

// Transactions Model
const db = require('../models');
const Transactions = db.transactions;

// GET endpoint to retrieve block addresses
router.get('/addresses', (req, res) => {
    const blockAddresses =  getAddresses();
    res.send(blockAddresses);
    console.log(`${req.method} ${req.url}`);
});

// GET endpoint to retrieve block addresses
router.get('/details/:addressId', (req, res) => {
    const addressId = req.params.addressId;
    const blockAddresDetails = getDetail(addressId);
    res.send(blockAddresDetails);
    console.log(`${req.method} ${req.url}`);
});

// POST endpoint to save transactions
router.post('/transactions', async (req, res) => {
    const transactions = req.body;
    console.log(`${req.method} ${req.url} ${JSON.stringify(transactions)}`);
    await Transactions.create(transactions);
    res.status(201).json(transactions);
}); 

module.exports = router;