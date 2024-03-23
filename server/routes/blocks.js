const express = require('express');
const router = express.Router();

// Import then Create an instance of EthereumBlocks
const BlocksModule = require('../modules/blocksModule');
const ethereumBlocks = new BlocksModule();

// GET endpoint to retrieve block addresses
router.get('/addresses', (req, res) => {
    const blockAddresses =  ethereumBlocks.getAddresses();
    res.send(blockAddresses);
    console.log(`${req.method} ${req.url}`);
});

// GET endpoint to retrieve block addresses
router.get('/details/:addressId', (req, res) => {
    const addressId = req.params.addressId;
    const blockAddresDetails = ethereumBlocks.getDetail(addressId);
    res.send(blockAddresDetails);
    console.log(`${req.method} ${req.url}`);
}); 

module.exports = router;