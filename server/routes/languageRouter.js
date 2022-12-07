const express = require('express');
const languageController = require('../controllers/languageController');
const router = express.Router();

router.get('/', languageController.get, (req, res) => {
  return res.send(res.locals.languages);
});

module.exports = router;