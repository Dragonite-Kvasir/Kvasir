require('dotenv').config();
const db = require('../models/postgres')

const interestController = {};

interestController.get = async (req, res, next) => {
  try {
      const query = `SELECT name FROM interests`;
      const { rows } = await db.query(query);
      res.locals.interests = rows.map((e) => e = e.name);
      console.log(res.locals.interests);
      return next();
    }
    catch(err) {
      return next({
        log: `Error in partnerController.reply: ${err}`,
        status: 500,
        message: 'Cannot reply to a partner request right now, sorry!'
      }); 
    }
}

module.exports = interestController;