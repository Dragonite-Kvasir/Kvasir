require('dotenv').config();
const db = require('../models/postgres');

const partnerController = {};

partnerController.explore = async (req, res, next) => {
  console.log(req.query);
  const { id } = req.query;
  try {
    const query = `SELECT users._id,users.last_login, users.display_name FROM users`;
    const filter = `SELECT user_id_rec FROM user_relationships WHERE user_id_sent=${id}`;
    const { rows } = await db.query(query);
    const filters = await db.query(filter);
    const combine = new Set();
    filters.rows.map((e) => {
      combine.add(e.user_id_rec);
    });
    const final = rows.filter((user) => {
      if (!combine.has(user._id)) {
        return user;
      }
    });
    res.locals.explore = final;
    return next();
  } catch (err) {
    return next({
      log: `Error in partnerController.explore: ${err}`,
      status: 500,
      message: 'Cannot get the explore page right now, sorry!',
    });
  }
};

partnerController.add = async (req, res, next) => {
  const { id } = req.params;
  const { currUser } = req.body;
  try {
    //friend = 1, requested = 2, pending = 3
    const query = `INSERT INTO user_relationships(user_id_sent, user_id_rec, status) VALUES (${currUser},${id}, ${2})`;
    const query2 = `INSERT INTO user_relationships(user_id_sent, user_id_rec, status) VALUES (${id},${currUser}, ${3})`;
    const friendQuery = `SELECT * FROM users WHERE users._id=${id}`;
    const addFriend = db.query(query);
    const addPending = db.query(query2);
    const friendData = await db.query(friendQuery);
    res.locals.newFriend = friendData.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in partnerController.add: ${err}`,
      status: 500,
      message: 'Cannot send a partner request right now, sorry!',
    });
  }
};

partnerController.reply = async (req, res, next) => {
  try {
    console.log(req.params);
    console.log(req.query);
    return next();
  } catch (err) {
    return next({
      log: `Error in partnerController.reply: ${err}`,
      status: 500,
      message: 'Cannot reply to a partner request right now, sorry!',
    });
  }
};

partnerController.delete = async (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error in partnerController.reply: ${err}`,
      status: 500,
      message: 'Cannot reply to a partner request right now, sorry!',
    });
  }
};

partnerController.getAll = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const query1 = `SELECT users.*, status FROM user_relationships INNER JOIN users ON user_id_rec=users._id WHERE user_id_sent=${userId}`;
    const results = await db.query(query1);
    const friends = { 1: [], 2: [], 3: [] };
    results.rows.forEach((user) => {
      friends[user.status] = friends[user.status].concat(user);
    });
    res.locals.friends = friends;
    return next();
  } catch (err) {
    return next({
      log: `Error in partnerController.reply: ${err}`,
      status: 500,
      message: 'Cannot reply to a partner request right now, sorry!',
    });
  }
};

module.exports = partnerController;
