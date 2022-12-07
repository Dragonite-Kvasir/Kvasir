const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

router.get('/explore', partnerController.explore, (req, res) => {
  return res.status(200).json(res.locals.explore);
});

router.post('/add/:id', partnerController.add, (req, res) => {
  return res.status(200).send(res.locals.newFriend);
});

router.post('/reply', partnerController.reply, (req, res) => {
  return res.send('two thumbs up!');
});

router.delete('/delete', partnerController.delete, (req, res) => {
  return res.send('two thumbs down!');
});

router.get('/getFriends', partnerController.getAll, (req, res) => {
  return res.status(200).json(res.locals.friends);
});

module.exports = router;
