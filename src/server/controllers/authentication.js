const jwt = require('jwt-simple');

const User = require('../models/user');
const config = require('../config');
const hlpr = require('../lib/helpers');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  const newJWT = jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
  hlpr.consLog(['tokenForUser', newJWT]);
  return newJWT;
}

exports.signinError = (err, req, res, next) => {
  hlpr.consLog(['signin', `AUTH ERROR: Signin - Bad Email or Password @ ${req.ip}`]);
  return res.status(422).send({ error: 'Signin failed: Bad Email or Password.' });
};

exports.signin = (req, res, next) => {
  hlpr.consLog(['signin', `res.send signin token ${req.user}`]);
  res.send({ token: tokenForUser(req.user) });
};

exports.stravaSignin = (req, res, next) => {
  hlpr.consLog(['stravaSignin', `res.send signin token ${req.user}`]);
  hlpr.consLog(['req', req.user.stravaId]);
  const result = `
      <script>
        localStorage.setItem('token', '${tokenForUser(req.user)}');
        window.location='/';
      </script>`;

  res.send(result);
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    hlpr.consLog(['signup', 'AUTH ERROR: No email or password']);
    return res.status(422).send({ error: 'You must provide email and password!' });
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      hlpr.consLog(['signup', 'AUTH ERROR: Email in use']);
      return res.status(422).send({ error: 'Email is in use!' });
    }
    const user = new User({
      email: email,
      password: password,
    });
    user.save((err) => {
      if (err) { return next(err); }
      hlpr.consLog(['signup', 'AUTH SUCCESS: Token Sent']);
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.user = (req, res, next) => {
  User.findOne({ $or: [{ email: req.user.email },{ stravaId: req.user.stravaId }] }, (err, user) => {
    if (err) { return next(err); }
    if (user) {
      hlpr.consLog(['auth-user', 'AUTH USER: User found', user.email]);
      return res.json({ user: user });
    }
  });
};