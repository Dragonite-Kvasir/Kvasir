const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.checkEmailExists, userController.signup, (req, res) => {
    return res.status(200).json(res.locals.status);
});

router.post('/login', userController.login, (req, res) => {
    return res.status(200).json(res.locals);
});

router.post('/create', userController.create, (req, res) => {
    return res.send('two thumbs up!');
});

router.patch('/update', userController.update, (req, res) => {
    return res.send('two thumbs up!');
});

router.get('/feed', userController.feed, (req, res) => {
    return res.send('two thumbs up!');
});

module.exports = router;