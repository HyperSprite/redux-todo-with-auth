const router = require('express').Router();
const path = require('path');
const passport = require('passport');

const passportService = require('./../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const config = require('./../config');
const hlpr = require('../lib/helpers');

const authRoutes = require('./auth');
const eventsRoutes = require('./events');
const stravaRoutes = require('./strava');

const indexHTML = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>A Race Athlete</title>
    </head>
    <body>
      <div id='root'></div>
      <script src='/assets/bundle.js'></script>
    </body>
  </html>
`;

router.get('/', (req, res) => {
  res.send(indexHTML);
});

router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  hlpr.consLog(['index/secret']);
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.use('/auth', authRoutes);
router.use('/apiv1/events', eventsRoutes);
router.use('/apiv1/strava', stravaRoutes);

router.get('*', (req, res) => {
  res.send(indexHTML);
});

module.exports = router;
