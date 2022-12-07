require('dotenv').config();
const db = require('../models/postgres')

const languageController = {};

languageController.get = async (req, res, next) => {
  try {
      const query = `SELECT name FROM languages`;
      const { rows } = await db.query(query);
      res.locals.languages = rows.map((e) => e = e.name);
      console.log(res.locals.languages);
      return next();
    }
    catch(err) {
      return next({
        log: `Error in languageController.reply: ${err}`,
        status: 500,
        message: 'Cannot reply to a partner request right now, sorry!'
      }); 
    }
}

module.exports = languageController;