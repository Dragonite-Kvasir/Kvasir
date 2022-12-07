require('dotenv').config();
const db = require('../models/postgres')

const partnerController = {};

partnerController.explore = async(req, res, next) => {
    try {
        return next();
      }
      catch(err) {
        return next({
          log: `Error in partnerController.explore: ${err}`,
          status: 500,
          message: 'Cannot get the explore page right now, sorry!'
        }); 
      }
}

partnerController.add = async(req, res, next) => {
    try {
        return next();
      }
      catch(err) {
        return next({
          log: `Error in partnerController.add: ${err}`,
          status: 500,
          message: 'Cannot send a partner request right now, sorry!'
        }); 
      }
}

partnerController.reply = (req, res, next) => {
    try {
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

module.exports = partnerController;