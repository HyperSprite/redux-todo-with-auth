const router = require('express').Router();
const path = require('path');
const passport = require('passport');

const passportService = require('./../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const hlpr = require('../lib/helpers');

const authRoutes = require('./auth');
const eventsRoutes = require('./events');
const stravaRoutes = require('./strava');

const indexHTML = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>A Race Athlete</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
      <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
      <link rel="manifest" href="/favicons/manifest.json">
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#cc0000">
      <link rel="shortcut icon" href="/favicons/favicon.ico">
      <meta name="msapplication-config" content="/favicons/browserconfig.xml">
      <meta name="theme-color" content="#cc0000">
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

router.get('/.well-known/acme-challenge/:acmeToken', (req, res, next) => {
  const acmeToken = req.params.acmeToken;
  let acmeKey;

  if (process.env.ACME_KEY && process.env.ACME_TOKEN) {
    if (acmeToken === process.env.ACME_TOKEN) {
      acmeKey = process.env.ACME_KEY;
    }
  }

  for (const key in process.env) {
    if (key.startsWith('ACME_TOKEN_')) {
      const num = key.split('ACME_TOKEN_')[1];
      if (acmeToken === process.env['ACME_TOKEN_' + num]) {
        acmeKey = process.env['ACME_KEY_' + num];
      }
    }
  }

  if (acmeKey) res.send(acmeKey);
  else res.status(404).send();
});

router.get('*', (req, res) => {
  res.send(indexHTML);
});

module.exports = router;
