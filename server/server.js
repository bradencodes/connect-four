const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

server.use(cors({ origin: 'http://localhost:3000' , credentials: true }));
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' })
});

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/connectFour', { useNewUrlParser: true }, (error) => {
    if (error) console.log(error);
    console.log("Mongoose connected to connectFour DB");
})

server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
})
