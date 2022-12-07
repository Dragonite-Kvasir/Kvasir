const db = require('../models/postgres');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.checkEmailExists = async (req, res, next) => {
  //Works
  const { email } = req.body;
  try {
    //query users table to see if email already exists in db
    const existingEmail = `SELECT * FROM users WHERE email = '${email}';`;
    const { rows } = await db.query(existingEmail);
    if (rows[0]) {
      res.locals.status = 'Email already registered';
      return next({
        log: `Error in userController.checkUser`,
        status: 409,
        message: 'Email already registered, login!',
      });
    } else {
      res.locals.status = 'Email available';
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.checkUser: ${err}`,
      status: 500,
      message: 'Cannot check database right now, sorry!',
    });
  }
};

userController.signup = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, 'signup');
  const today = new Date().toDateString();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const queryStr = `INSERT INTO users(email, password, last_login) VALUES ($1, $2, $3) RETURNING * ;`;
    const values = [email, hashedPass, today];
    const { rows } = db.query(queryStr, values);

    return next();
  } catch (err) {
    console.log(req.body);
    return next({
      log: `Error in userController.signup: ${err}`,
      status: 500,
      message: 'Cannot signup user right now, sorry!',
    });
  }
};

userController.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('login');
  const today = new Date().toDateString();
  console.log(today);
  try {
    const loginQuery = `SELECT * FROM users WHERE email = '${email}';`;
    const dateQuery = `UPDATE users SET last_login = '${today}' WHERE email = '${email}';`;
    //add query to insert login date
    const { rows } = await db.query(loginQuery);

    if (await bcrypt.compare(password, rows[0].password)) {
      const user = { id: rows[0]._id };
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SERVER);
      res.cookie('token', accessToken);
      await db.query(dateQuery);
      res.locals.loggedIn = { accessToken: accessToken };
      res.locals.date = today;
    } else {
      return next({ status: 403 });
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.login: ${err}`,
      status: 500,
      message: 'Cannot login user right now, sorry!',
    });
  }
};

userController.create = (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.create: ${err}`,
      status: 500,
      message: 'Cannot create a profile right now, sorry!',
    });
  }
};

userController.update = (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.update: ${err}`,
      status: 500,
      message: 'Cannot update profile right now, sorry!',
    });
  }
};

userController.feed = (req, res, next) => {
  try {
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.feed: ${err}`,
      status: 500,
      message: 'Cannot get your feed right now, sorry!',
    });
  }
};

module.exports = userController;
