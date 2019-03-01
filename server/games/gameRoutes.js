const router = require('express').Router();

const Game = require('./gameModel.js');
const User = require('../users/userModel.js');

//base route = '/game'

//create a new game
//input: the _id of 2 users
//output: the new game object
router.route('/create')
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
router.route('/get')
    .get((req, res) => {
        const { _id } = req.body;

        Game.findById(_id)
            .then(game => {
                if (game) res.status(200).json(game)
                else res.status(404).json({ errorMessage: 'Game not found' });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Database failed to look for game' });
            })
    });

function checkWinner(game) {
    //create an empty board to be filled
    let board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ];

    //loop through each column of the game to fill the board
    for (c = 0 ; c < 7 ; c++) {
        //fill the column to correspond to the game columns
        //note: this fills the columns upside down, but it will still work to determine the winner
        for (r = 0 ; r < game[`col${c+1}`].length ; r++) {
            let gameColor = game[`col${c+1}`][r]
            board[r][c] = gameColor;
        }
    }

    console.log(board);

    //a helper function to check if a line is 4 in a row
    function checkLine(a, b, c, d) {
        // Check first cell non-zero and all cells match
        return ((a != 0) && (a === b) && (a === c) && (a === d));
    }

    // Check down
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (checkLine(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]))
                return board[r][c];

    // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]))
                return board[r][c];

    // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]))
                return board[r][c];

    // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]))
                return board[r][c];

    return "none";
}

//update a game
//input: player_id, game_id, column of move
//output: the updated game
router.route('/update')
    .put((req, res) => {
        const { player_id, game_id, col} = req.body;

        //find the oldGame state to check that the move is valid
        Game.findById(game_id)
            .then(oldGame => {
                //check that the game isn't won, it is the player's turn, there is space in the column
                const isGoing = oldGame.winner === "none";
                const isTurn = oldGame[oldGame.turn] == player_id;
                const isSpace = oldGame[`col${col}`].length < 6;

                if (isGoing && isTurn && isSpace){
                    const newTurn = oldGame.turn === "red" ? "black" : "red";
                    Game.findByIdAndUpdate(game_id, { $push: {[`col${col}`]: oldGame.turn}, turn: newTurn }, {new: true})
                        .then(updatedGame => {
                            //check if the new move wins or ties
                            let newWinner = checkWinner(updatedGame);
                            console.log('newWinner: ', newWinner);
                            if (newWinner !== "none") {
                                Game.findByIdAndUpdate(game_id, {winner: newWinner}, {new: true})
                                    .then(finishedGame => res.status(200).json(finishedGame))
                            }

                            else if (updatedGame) res.status(200).json(updatedGame)
                            else res.status(404).json({ errorMessage: 'Game not found' });
                        })
                        .catch(err => {
                            res.status(500).json({ errorMessage: 'Database failed to update game' });
                        })
                }
                else res.status(400).json({ errorMessage: 'Invalid move. Try again' });
            })
            .catch(err => res.status(500).json({ errorMessage: 'Server failed to find game' }));
    });


module.exports = router;