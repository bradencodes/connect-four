const router = require('express').Router();

const User = require('./userModel.js');

//base route = '/user'

router.route('/create')
    .post((req, res) => {
        User.create()
            .then(newUser => {
                res.status(201).json(newUser);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Could not create new user' });
            })
    })