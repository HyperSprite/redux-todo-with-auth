const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');
const hlpr = require('../lib/helpers');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  hlpr.consLog(['res.send signin token']);
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    hlpr.consLog(['AUTH ERROR: No email or password']);
    return res.status(422).send({ error: 'You must provide email and password!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      hlpr.consLog('AUTH ERROR: Email in use');
      return res.status(422).send({ error: 'Email is in use!' });
    }
    const user = new User({
      email: email,
      password: password,
    });
    user.save((err) => {
      if (err) { return next(err); }
      hlpr.consLog(['AUTH SUCCESS: Token Sent']);
      res.json({ token: tokenForUser(user) });
    });
  });
};
