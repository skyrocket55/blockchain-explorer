const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); //parse request to send response
app.use(cors());

const db = require('./models');

// routers
const postRouter = require('./routes/Posts');
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log(`Server is running at port 3001...`);
    });
});



