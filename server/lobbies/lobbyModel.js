const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const LobbySchema = new mongoose.Schema({
    //there could be multiple lobbies separated by skill level, region, etc.
    name: { type: String, unique: true },

    //the users in a lobby waiting to be matched
    users: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Lobby', LobbySchema);