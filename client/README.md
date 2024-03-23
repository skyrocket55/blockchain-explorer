Full Stack II: Backend Web Development Blockchain Explorer

Submitted by: Ciel Recuerdo [101439257]
Submitted On: March 25, 2024 10:00

### Project Setup
1. npm install
2. npm start    http://localhost:3000

### Sample UI Flows


### Libraries Installed
- bootstrap 5, react-router-dom, react-fontawesome, fontawesome free-solid-svg-icons, fontawesome free-brands-svg-icon

### Features
1. EthereumAddresses and EthereumBlocks data generated using faker-js
2. Components
    2.1. Header
    2.2. Transactions
    2.3. Transfer <TODO>
    - GET /blocks/addresses
    ● (Route completed in FS II - Backend Dev Lab Test)
    ● use React lifecycle hook (useEffect & useState) or class components (componentDidMount and setState) to fetch the data from the backend
    ● Bind the source and destination addresses drop controls with the return list of addresses.

    - POST /transactions/send
    ● Update the form submit event handler to send the request when the use clicks the submit/send button
    ● Bind the Receipt component with the receipt data returned from the server

    - GET /transactions/history
    ● use React lifecycle hook (useEffect & useState) or class components (componentDidMount and setState) to fetch the data from the backend
    ● Bind the transaction history table/grid with the data returned from the server.

    2.4. Receipt
    2.5. Blocks
    2.6. BlockDetails
    2.7. Data: EthereumAddresses, EthereumBlocks
    2.8. Navigation *Navbar collapse not working - use react-bootstrap
    2.9. Dashboard (Home Page)
3. Routing using React Router 6
4. Mobile Responsive UI
5. Validations