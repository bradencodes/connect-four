const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
    //stores what player has what color and who's turn it is
    black: { type: ObjectId, ref: 'User' },
    red: { type: ObjectId, ref: 'User' },
    turn: String,

    //a representation of the game board split into columns
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: [],
    col7: [],
});

module.exports = mongoose.model('Game', GameSchema);