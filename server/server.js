const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const server = express();

server.use(cors({ origin: 'http://localhost:3000' , credentials: true }));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' })
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds040349.mlab.com:40349/connectfour`, { useNewUrlParser: true }, (error) => {
    if (error) console.log(error);
    console.log("Mongoose connected to mLab connectfour DB");
})

server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
})
