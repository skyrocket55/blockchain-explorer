const express = require('express');
const router = express.Router();

// Import then Create an instance of EthereumBlocks
const BlocksModule = require('../modules/blocksModule');
const ethereumBlocks = new BlocksModule();

// GET endpoint to retrieve block addresses from local Hardhat node
router.get('/addresses', async (req, res) => {
    try {
        const blockAddresses =  await ethereumBlocks.getAddresses();
        res.status(200).json(blockAddresses);
        console.log(`${req.method} ${req.url}`);   
    } catch (error) {
        res.status(500).json({
            message:
            error.message || "An error occurred while retrieving ethereum addresses."
        })
    }
});

// GET endpoint to retrieve block & transaction details based on address
router.get('/details/:addressId', async (req, res) => {
    try {
        const addressId = req.params.addressId;
        const blockAddresDetails = await ethereumBlocks.getDetail(addressId);
        res.status(200).json(blockAddresDetails);
        console.log(`${req.method} ${req.url}`);   
    } catch (error) {
        res.status(500).json({
            message:
            error.message || "An error occurred while retrieving block and transaction details."
        })
    }
}); 

module.exports = router;