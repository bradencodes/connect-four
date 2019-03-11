const Game = require('../games/gameModel.js');
const User = require('../users/userModel.js');

module.exports = (namespace) => {

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
    
        //a helper function to check if a line is 4 in a row
        function checkLine(a, b, c, d) {
            // Check first cell non-zero and all cells match
            return ((a != 0) && (a === b) && (a === c) && (a === d));
        }
    
        //check down
        for (r = 0; r < 3; r++)
            for (c = 0; c < 7; c++)
                if (checkLine(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c]))
                    return board[r][c];
    
        //check right
        for (r = 0; r < 6; r++)
            for (c = 0; c < 4; c++)
                if (checkLine(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3]))
                    return board[r][c];
    
        //check down-right
        for (r = 0; r < 3; r++)
            for (c = 0; c < 4; c++)
                if (checkLine(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3]))
                    return board[r][c];
    
        //check down-left
        for (r = 3; r < 6; r++)
            for (c = 0; c < 4; c++)
                if (checkLine(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3]))
                    return board[r][c];
    
        //check for a tie
        if (game.col1.length + game.col2.length + game.col3.length + game.col4.length
            + game.col5.length + game.col6.length + game.col7.length === 42)
            return "tie";
    
        return "none";
    }

    let room;

    namespace.on('connect', socket => {

        socket.on('join room', room_id => {
            socket.join(room_id);
            room = room_id;
        })

        socket.on('update', (player_id, game_id, col) => {
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
                                if (newWinner !== "none") {
                                    Game.findByIdAndUpdate(game_id, {winner: newWinner}, {new: true})
                                        .then(finishedGame => namespace.to(room).emit('finished', finishedGame))
                                }

                                else if (updatedGame) namespace.to(room).emit('updated', updatedGame);
                                else console.log("Game not found");
                            })
                            .catch(err => console.log("Database failed to update game"))
                    }
                    else console.log("Invalid move. Try again");
                })
                .catch(err => console.log("Server failed to find game"));
        })
    })
}