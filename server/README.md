Full Stack II: Backend Web Development Blockchain Explorer

Submitted by: Ciel Recuerdo [101439257]
Submitted On: March 25, 2024  01:00

### Project Setup
1. cd server
2. npm install
3. npx hardhat node
4. node app

### Sample UI Flows
https://www.loom.com/share/63df4f6627384d2c98e2403dead5a7aa

### Libraries Installed
- express, faker-js, cors, crypto-js, sequelize, pg, web3, hardhat

### Features
1. BlocksModule fetching from local Hardhat instance
2. TransactionsModule
2.1. getTransactionHistory() - returns transactionList from AWS RDS DB
2.2. sendTransfer(source, destination, amount)
3. Transaction model and schema using Sequelize
4. Transaction API routes: (1)GET /transactions/history, (2)POST /transactions/send
5. Pagination
6. Web3 Integration

### Sample cURL snippets and Response
1. GET http://localhost:3001/blocks/addresses
[
    "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
    "0x976ea74026e726554db657fa54763abd0c3a0aa9",
    "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
    "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
    "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
    "0xbcd4042de499d14e55001ccbb24a551f3b954096",
    "0x71be63f3384f5fb98995898a86b02fb2426c5788",
    "0xfabb0ac9d68b0b445fb7357272ff202c5651694a",
    "0x1cbd3b2770909d4e10f157cabc84c7264073c9ec",
    "0xdf3e18d64bc6a983f673ab319ccae4f1a57c7097",
    "0xcd3b766ccdd6ae721141f452c550ca635964ce71",
    "0x2546bcd3c84621e976d8185a91a922ae77ecec30",
    "0xbda5747bfd65f08deb54cb465eb87d40e51b197e",
    "0xdd2fd4581271e230360230f9337d5c0430bf44c0",
    "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"
]

2. GET http://localhost:3001/blocks/details/:addressId
curl --location 'http://localhost:3001/blocks/details/0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
{
    "address": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "balance": "296",
    "gasUsed": "0.000000001875",
    "blockNumber": 1,
    "blockHash": "0xc7e77d77460d7ec94aaf639a9917a927d56adf85b40dca87fdf897453752723d"
}

3. GET http://localhost:3001/transactions/history?page=1&size=5
{
    "totalItems": 1,
    "transactions": [
        {
            "id": 1,
            "source": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
            "destination": "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
            "amount": "55",
            "status": "SUCCESSFUL",
            "gasUsed": "224",
            "receiptHash": "07ba81d447d1e2eb3e7a538b57e8d2581245fe2ef8bfb86887b4b167b5046426",
            "createdAt": "2024-03-25T02:46:55.150Z",
            "updatedAt": "2024-03-25T02:46:55.150Z"
        }
    ],
    "totalPages": 1,
    "currentPage": 1
}

4. POST Transactions
curl --location 'http://localhost:3001/transactions/send' \
--header 'Content-Type: application/json' \
--data '{
    "source": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "destination": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "amount": 555.00
}'

{
    "source": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    "destination": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    "amount": 555,
    "gasUsed": "371",
    "receiptHash": "b0642d0eb4c86a6b219ceaca5d555f207c111aee1f9d6467dd988a5e3734ecee"
}