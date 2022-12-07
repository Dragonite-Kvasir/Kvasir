const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
  '/signup',
  userController.checkEmailExists,
  userController.signup,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post(
  '/login',
  userController.login,
  userController.getInfo,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post(
  '/create',
  userController.getId,
  userController.updateName,
  userController.updateInterest,
  userController.updateTeach,
  userController.updateLearn,
  (req, res) => {
    return res.send('two thumbs up!');
  }
);

router.post('/check', userController.login, (req, res) => {
  return res.send('two thumbs up!');
});

router.patch(
  '/update/name',
  userController.getId,
  userController.updateName,
  (req, res) => {
    return res.status(200).json(res.locals.displayName);
  }
);

router.patch(
  '/update/interest',
  userController.getId,
  userController.updateInterest,
  (req, res) => {
    return res.send('two thumbs up!');
  }
);

router.patch('/update/password', userController.password, (req, res) => {
  return res.send('two thumbs up!');
});

router.patch(
  '/update/teach',
  userController.getId,
  userController.updateTeach,
  (req, res) => {
    return res.send('two thumbs up!');
  }
);

router.patch(
  '/update/learn',
  userController.getId,
  userController.updateLearn,
  (req, res) => {
    return res.send('two thumbs up!');
  }
);

router.get('/feed', userController.getId, userController.feed, (req, res) => {
  return res.send('two thumbs up!');
});

module.exports = router;
