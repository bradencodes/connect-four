const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`\n=== API running on http://localhost:${port} ===\n`);
})

app.use(cors({ origin: ['http://localhost:3000', 'https://connect-1234.netlify.com' ] , credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' })
});

const userRoutes = require('./users/userRoutes.js');
const gameRoutes = require('./games/gameRoutes.js');

app.use('/user', userRoutes);
app.use('/game', gameRoutes);

require('./socketRoutes/matching.js')(io.of('matching'));
require('./socketRoutes/game.js')(io.of('game'));

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds040349.mlab.com:40349/connectfour`, { useNewUrlParser: true }, (error) => {
    if (error) console.log(error);
    else console.log("Mongoose connected to mLab connectfour DB");
})
