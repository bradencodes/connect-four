const router = require('express').Router();

const Game = require('./gameModel.js');
const User = require('../users/userModel.js');

//base route = '/game'

//create a new game
//input: the _id of 2 users
//output: the new game object
router.route('')
    .post((req, res) => {
        //randomly decide which player is what color
        const { player1_id, player2_id } = req.body;
        const randNum = Math.random();
        let game = {};
        if (randNum < 0.5) {
            game['black'] = player1_id;
            game['red'] = player2_id;
        } else {
            game['black'] = player2_id;
            game['red'] = player1_id;
        }

        Game.create(game)
            .then(newGame => {
                //add the new game to both player's games array
                User.findByIdAndUpdate(player1_id, { $push: {games: newGame._id} })
                    .then(_ => {
                        User.findByIdAndUpdate(player2_id, { $push: {games: newGame._id} })
                            .then(__ => {
                                res.status(201).json(newGame);
                            })
                    })
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Server failed to create new game" });
            })
    });

//find a game
//input: the _id of the game
//output: the matching game object
router.route('/:_id')
    .get((req, res) => {
        const { _id } = req.params;

        Game.findById(_id)
            .then(game => {
                if (game) res.status(200).json(game)
                else res.status(404).json({ errorMessage: 'Game not found' });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Database failed to look for game' });
            })
    });

module.exports = router;