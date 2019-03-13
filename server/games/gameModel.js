const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GameSchema = new mongoose.Schema({
    //store what player has what color and who's turn it is
    black: { type: ObjectId, ref: 'User' },
    red: { type: ObjectId, ref: 'User' },
    turn: String,
    winner: { type: String, default: "none" },

    //each player's current emote
    blackEmote: { type: String, default: "happy" },
    redEmote: { type: String, default: "happy" },

    //a representation of the game board split into columns
    col1: [],
    col2: [],
    col3: [],
    col4: [],
    col5: [],
    col6: [],
    col7: [],
});

//before creating a new game, randomly decide who starts
GameSchema.pre('save', function(next) {
    const randNum = Math.random();
    this.turn = randNum < 0.5 ? "black" : "red";
    return next();
});

module.exports = mongoose.model('Game', GameSchema);