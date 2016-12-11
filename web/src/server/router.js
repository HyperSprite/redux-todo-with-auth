const path = require('path');
const passport = require('passport');

const config = require('./config');

const rootDir = `${__dirname}/${config.public}/assets`;
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

// Auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false, failWithError: true });

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(rootDir, 'index.html'));
  });
  app.post('/signin', requireSignin, Authentication.signin, Authentication.signinError);
  app.post('/signup', Authentication.signup);
  app.get('/secret', requireAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ secret: 'Authorized' }));
  });
};
