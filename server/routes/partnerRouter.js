const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');


router.get('/explore', partnerController.explore, (req, res) => {
  return res.send('two thumbs up!');
});

router.post('/add', partnerController.add, (req, res) => {
  return res.send('two thumbs up!');
});

router.post('/reply', partnerController.reply, (req, res) => {
  return res.send('two thumbs up!');
});

module.exports = router;