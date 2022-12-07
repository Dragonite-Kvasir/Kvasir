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

userController.password = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, 'signup');
  const today = new Date().toDateString();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const queryStr = `UPDATE users SET password='${hashedPass}' WHERE email='${email}'`;
    const r = await db.query(queryStr);
    console.log(r);
    return next();
  } catch (err) {
    console.log(req.body);
    return next({
      log: `Error in userController.password: ${err}`,
      status: 500,
      message: 'Cannot change user password right now, sorry!',
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
    db.query(queryStr, values);
    const loginQuery = `SELECT * FROM users WHERE email = '${email}';`;
    const { rows } = await db.query(loginQuery);
    const user = {
      id: rows[0]._id,
      displayName: rows[0].display_name,
      lastLogin: rows[0].last_login,
      email: rows[0].email,
    };
    const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SERVER);
    res.cookie('token', accessToken);
    res.locals.loggedIn = { accessToken: accessToken };
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.signup: ${err}`,
      status: 500,
      message: 'Cannot signup user right now, sorry!',
    });
  }
};

userController.login = async (req, res, next) => {
  const { email, password } = req.body;
  const today = new Date().toDateString();
  console.log(today);
  try {
    const loginQuery = `SELECT * FROM users WHERE email = '${email}';`;
    const dateQuery = `UPDATE users SET last_login = '${today}' WHERE email = '${email}';`;
    //add query to insert login date
    const { rows } = await db.query(loginQuery);
    if (await bcrypt.compare(password, rows[0].password)) {
      const user = {
        id: rows[0]._id,
        displayName: rows[0].displayName,
        lastLogin: rows[0].last_login,
      };
      const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SERVER);
      res.cookie('token', accessToken);
      await db.query(dateQuery);
      res.locals.userInfo = {};
      res.locals.loggedIn = { accessToken: accessToken };
      res.locals.date = today;
      res.locals.userInfo.id = user.id;
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

userController.getId = async (req, res, next) => {
  const { email } = req.body;
  try {
    const userQuery = `SELECT _id FROM users WHERE email='${email}'`;
    const { rows } = await db.query(userQuery);
    res.locals.userId = rows[0]._id;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.update: ${err}`,
      status: 500,
      message: 'Cannot update profile right now, sorry!',
    });
  }
};

userController.updateName = async (req, res, next) => {
  const { displayName } = req.body;
  const id = res.locals.userId;
  console.log(id);
  try {
    if(displayName.length){
      const displayNameQuery = `UPDATE users SET display_name = '${displayName}' WHERE _id = '${id}';`;
      const { rows } = await db.query(displayNameQuery);
      res.locals.displayName = displayName;
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.update: ${err}`,
      status: 500,
      message: 'Cannot update profile right now, sorry!',
    });
  }
};

userController.updateInterest = async (req, res, next) => {
  const { interests } = req.body;
  try {
    // delete current user interests
    const del = `DELETE FROM user_interests WHERE user_id=${res.locals.userId}`;
    const deleted = await db.query(del);
    console.log(deleted);

    if(interests.length) {
      // get interests
      let query =
        `SELECT _id FROM interests WHERE name='` +
        interests.join("' OR name='") +
        "'";
      const { rows } = await db.query(query);
      console.log(rows);

      // add user interests
      const adding =
        `INSERT INTO user_interests(user_id, interest_id) VALUES` +
        rows.map((e) => `(${res.locals.userId},${e._id})`).join(',');
      const added = await db.query(adding);
      console.log(added);
  }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.update: ${err}`,
      status: 500,
      message: 'Cannot update profile right now, sorry!',
    });
  }
};

userController.updateTeach = async (req, res, next) => {
  const { teach } = req.body;
  try {
    // delete current user teach languages
    const del = `DELETE FROM user_teach_languages WHERE user_id=${res.locals.userId}`;
    const deleted = await db.query(del);
    console.log(deleted);

    if(teach.length){
      // get languages
      let query =
        `SELECT _id FROM languages WHERE name='` +
        teach.join("' OR name='") +
        "'";
      const { rows } = await db.query(query);
      console.log(rows);

      // add user teach languages

      const adding =
        `INSERT INTO user_teach_languages(user_id, language_id) VALUES` +
        rows.map((e) => `(${res.locals.userId},${e._id})`).join(',');
      const added = await db.query(adding);
      console.log(added);
    }
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.update: ${err}`,
      status: 500,
      message: 'Cannot update profile right now, sorry!',
    });
  }
};

userController.updateLearn = async (req, res, next) => {
  const { learn } = req.body;
  try {
    // delete current user teach languages
    const del = `DELETE FROM user_learn_languages WHERE user_id=${res.locals.userId}`;
    const deleted = await db.query(del);
    console.log(deleted);

    if(learn.length) {
    // get languages
    let query =
      `SELECT _id FROM languages WHERE name='` +
      learn.join("' OR name='") +
      "'";
    const { rows } = await db.query(query);
    console.log(rows);

    // add user teach languages
    const adding =
      `INSERT INTO user_learn_languages(user_id, language_id) VALUES` +
      rows.map((e) => `(${res.locals.userId},${e._id})`).join(',');
    const added = await db.query(adding);
    console.log(added);
  }

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

userController.getInfo = async (req, res, next) => {
  try {
    const q1 = `SELECT display_name FROM users WHERE _id=${res.locals.userInfo.id}`;
    let d1 = await db.query(q1);
    if (d1.rows[0].display_name)
      res.locals.userInfo.displayName = d1.rows[0].display_name;
    else res.locals.userInfo.displayName = '';

    const q2 = `SELECT * FROM user_interests i LEFT OUTER JOIN interests ON i.interest_id = interests._id WHERE i.user_id=${res.locals.userInfo.id}`;
    let d2 = await db.query(q2);
    if (d2.rows[0]) res.locals.userInfo.interests = d2.rows.map((e) => e.name);
    else res.locals.userInfo.interests = [];

    const q3 = `SELECT * FROM user_teach_languages LEFT OUTER JOIN languages ON user_teach_languages.language_id = languages._id WHERE user_teach_languages.user_id = ${res.locals.userInfo.id}`;
    let d3 = await db.query(q3);
    if (d3.rows[0]) res.locals.userInfo.canTeach = d3.rows.map((e) => e.name);
    else res.locals.userInfo.canTeach = [];

    const q4 = `SELECT * FROM user_learn_languages LEFT OUTER JOIN languages ON user_learn_languages.language_id = languages._id WHERE user_learn_languages.user_id = ${res.locals.userInfo.id}`;
    let d4 = await db.query(q4);
    if (d4.rows[0]) res.locals.userInfo.canLearn = d4.rows.map((e) => e.name);
    else res.locals.userInfo.canLearn = [];
    res.locals.userInfo.email = req.body.email;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.getInfo: ${err}`,
      status: 500,
      message: 'Cannot get your info right now, sorry!',
    });
  }
};
module.exports = userController;
