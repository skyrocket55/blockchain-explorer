Full Stack II: Backend Web Development Blockchain Explorer

Submitted by: Ciel Recuerdo [101439257]
Submitted On: March 25, 2024 10:00

### Project Setup
1. npm install
2. node app

### Libraries Installed
- express, faker-js, cors, crypto-js

### Modules
1. BlocksModule
2. Transactions 
2.1. getTransactionHistory() returns transactionList(from DB) <DONE>
2.2. sendTransfer(source, destination, amount) <DONE>

3. Transaction model and schema <DONE>

4. Transaction API routes
- GET /transactions/history <DONE>
- POST /transactions/send <DONE>

5. DB migrations | Setup AWS RDS

6. Pagination <DONE>

7. Web3 Integration

8. Code Review & Cleaning

### Sample cURL snippets and Response
1. GET http://localhost:3001/blocks/addresses
curl --location 'http://localhost:3001/blocks/addresses'

[
    "0xdfbe8d572fdee6039f9bbdced00422c9be3f9cdd",
    "0xedf8bf3fbef2b0944d1d5628d61eea0fafc03c1e",
    "0x0df6a34f864742aa5cffde854f4bb2ff52ec81a0",
    "0x9011b0ed2ec2edfc2a1c3cebb0bf1a25f76ce1db",
    "0xa380b04e7ed010dd8bca980cc33fbc0b9bcace6f",
    "0xf6f7080a5c456ef61ddd393be780aaedc7f2c1ab",
    "0xe2a5bfed399efb725eabd1e013c3cdaa10ade16c",
    "0x3c99cc7aef98c6aa9ef5dff6fa34c7d4cb8a3de3"
]

2. GET http://localhost:3001/blocks/details/:addressId
curl --location 'http://localhost:3001/blocks/details/0x3c99cc7aef98c6aa9ef5dff6fa34c7d4cb8a3de3'

{
    "address": "0x3c99cc7aef98c6aa9ef5dff6fa34c7d4cb8a3de3",
    "balance": "425.97",
    "gasUsed": 479
}