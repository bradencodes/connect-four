const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    //a random username that will be stored on localStorage
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    //the games that a user has been a part of
    games: [{ type: ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('User', UserSchema);