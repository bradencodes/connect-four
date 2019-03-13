const router = require('express').Router();

const User = require('./userModel.js');

//base route = '/user'

//create a new user
//input: none
//output: the new user with `_id` and `games` fields
router.route('')
    .post((req, res) => {
        User.create({})
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Could not create new user' });
            })
    })

//find a user
//input: the _id of the user
//output: the user matching the _id
router.route('/:_id')
    .get((req, res) => {
        const { _id } = req.params;

        User.findById(_id)
            .then(user => {
                if (user) res.status(200).json(user)
                else res.status(404).json({ errorMessage: 'User not found' });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Database failed to look for user' });
            })
    })

module.exports = router;