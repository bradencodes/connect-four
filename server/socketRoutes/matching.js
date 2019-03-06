module.exports = (namespace) => {
    //lobby consists of user_id as keys and their socket as values
    let lobby = {};
    let runningLoop = false;

    const matchingLoop = () => {
        if (runningLoop) return;

        runningLoop = true;

        let users = Object.keys(lobby);

        while (users.length > 1) {
            let player1ID = users[0];
            let player1Socket = lobby[player1ID];
            let player2ID = users[1];
            let player2Socket = lobby[player2ID];

            
        }
    }

    namespace.on('connect', socket => {


        socket.on('joinLobby', (user) => {

        })

        socket.on('disconnect', () => {
            
        })
    })
}