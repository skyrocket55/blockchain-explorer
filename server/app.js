const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// To fix CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Parse x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: true }));

// Import the router
const blocksRouter = require('./routes/blocks');

// Use the blocks router
app.use('/blocks', blocksRouter);

// Define the port for the server
const PORT = process.env.port || 3001;

// Start the server
const db = require('./models');
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`CORS-enabled Server is running on port ${PORT}`);
    });
});

