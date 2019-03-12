const Game = require('../games/gameModel.js');
const User = require('../users/userModel.js');

module.exports = (namespace) => {
    //lobby consists of user_id as keys and their socket as values
    let lobby = {};
    let runningLoop = false;

    const matchingLoop = () => {
        //check that the loop is running to avoid duplicate matches
        if (runningLoop) return;

        runningLoop = true;

        let users = Object.keys(lobby);

        //as long as there is more than one player in the lobby, match the players together
        while (users.length > 1) {
            let player1ID = users[0];
            let player1Socket = lobby[player1ID];
            let player2ID = users[1];
            let player2Socket = lobby[player2ID];

            //create a game with the two players, and randomly assign them a color
            const randNum = Math.random();
            let game = {};
            if (randNum < 0.5) {
                game.black = player1ID;
                game.red = player2ID;
            } else {
                game.black = player2ID;
                game.red = player1ID;
            }

            Game.create(game)
                .then(newGame => {
                    //add the new game to both player's games array
                    User.findByIdAndUpdate(player1ID, { $push: {games: newGame._id} })
                        .then(_ => {
                            User.findByIdAndUpdate(player2ID, { $push: {games: newGame._id} })
                                .then(__ => {
                                    player1Socket.emit('matched', newGame);
                                    player2Socket.emit('matched', newGame);
                                })
                        })
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "Server failed to create new game" });
                })

            //remove the matched players from the lobby
            delete lobby[player1ID];
            delete lobby[player2ID];

            users = Object.keys(lobby);
        }

        runningLoop = false;
    }

    namespace.on('connect', socket => {

        //add users to the lobby object when they join matchmaking, and start the matching loop
        socket.on('joinLobby', (user) => {
            socket.userData = {...user};
            lobby[user._id] = socket;

            matchingLoop();
        })

        //'leave' and 'disconnect' both take the player out of the lobby
        //Use 'leave' when hardcoding a leave (i.e. when the user navigates away from matchmaking)
        socket.on('leave', () => {
            if (!socket.userData) return;

            delete lobby[socket.userData._id];
        })

        //'disconnect' will trigger automatically when app is closed
        socket.on('disconnect', () => {
            if (!socket.userData) return;

            delete lobby[socket.userData._id];
        })
    })
}