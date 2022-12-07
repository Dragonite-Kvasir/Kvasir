const express = require('express');
const interestController = require('../controllers/interestController');
const router = express.Router();

router.get('/', interestController.get, (req, res) => {
  return res.send(res.locals.interests);
});

module.exports = router;