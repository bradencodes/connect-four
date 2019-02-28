const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const userRoutes = require('./users/userRoutes.js');

const server = express();

server.use(cors({ origin: 'http://localhost:3000' , credentials: true }));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' })
});

server.use('/user', userRoutes);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds040349.mlab.com:40349/connectfour`, { useNewUrlParser: true }, (error) => {
    if (error) console.log(error);
    else console.log("Mongoose connected to mLab connectfour DB");
})

server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
})
