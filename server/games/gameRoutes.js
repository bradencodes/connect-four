const router = require('express').Router();

const Game = require('./gameModel.js');
const User = require('../users/userModel.js');

//base route = '/game'

//create a new game
//input: the _id of 2 users
//output: the new game object
router.route('/create')
    .post((req, res) => {
        const { player1, player2 } = req.body;
        const randNum = Math.random();
        let game = {};
        if (randNum < 0.5) {
            game['black'] = player1;
            game['red'] = player2;
        } else {
            game['black'] = player2;
            game['red'] = player1;
        }
        
    })


module.exports = router;