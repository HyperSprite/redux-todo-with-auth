const router = require('express').Router();
const path = require('path');
const passport = require('passport');

const passportService = require('./../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const config = require('./../config');
const hlpr = require('../lib/helpers');

const authRoutes = require('./auth');
const eventsRoutes = require('./events');

router.get('/', (req, res) => {
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Redux Todo Demo</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      </head>
      <body>
        <div id='root'></div>
        <script src='assets/bundle.js'></script>
      </body>
    </html>
`);
});

router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  hlpr.consLog(['index/secret']);
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.use('/auth', authRoutes);
router.use('/events', eventsRoutes);

module.exports = router;
