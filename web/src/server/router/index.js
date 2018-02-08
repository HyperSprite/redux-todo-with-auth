const router = require('express').Router();
const path = require('path');
const passport = require('passport');

const passportService = require('./../services/passport');
const hlpr = require('../lib/helpers');
const rLib = require('./router-lib');

const activitiesRoutes = require('./activities');
const activityRoutes = require('./activity');
const adminRoutes = require('./admin');
const authRoutes = require('./auth');
const eventsRoutes = require('./events');
const stravaRoutes = require('./strava');
const resourceRoutes = require('./resources');
const rteRoutes = require('./routeplans');
const webhooks = require('./webhooks');
const jsonfile = require('jsonfile');

let manifest;
if (hlpr.isProd() || process.env.NODE_ENV === 'API-ONLY') {
  const manifestPath = `${__dirname}/../public/assets/manifest.json`;
  manifest = jsonfile.readFileSync(manifestPath);
} else {
  manifest = {
    'bundle.js': 'bundle.js',
    'node-static.js': 'node-static.js',
  };
}

const googleAnalytics = hlpr.isProd() ? `
  <!-- Google Analytics -->
    <script defer>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-84713563-2', 'auto');
      ga('send', 'pageview');
    </script>
  <!-- End Google Analytics -->
` : '';

const indexHTML = `
  <!doctype html>
  <html lang="en">
    <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>A Race athlete</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
      <link rel="icon" type="image/png" href="/favicons/favicon-32x32.png" sizes="32x32">
      <link rel="icon" type="image/png" href="/favicons/favicon-16x16.png" sizes="16x16">
      <link rel="manifest" href="/favicons/manifest.json">
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#cc0000">
      <link rel="shortcut icon" href="/favicons/favicon.ico">
      <link rel="image_src" href="https://www.araceathlete.com/images/wide-banner.png">
      <meta name="msapplication-config" content="/favicons/browserconfig.xml">
      <meta name="theme-color" content="#cc0000">
      <meta property="og:image" content="/images/logo-512x512.png" />
      <link rel="stylesheet" type="text/css" href="/styles/main.css">
    </head>
    <body>
      <div id='root'>
        <div class="centered">
          <img src="/images/preloader.gif">
        </div>
      </div>
      <script src="/assets/${manifest['node-static.js']}"></script>
      <script src="/assets/${manifest['bundle.js']}"></script>
      ${googleAnalytics}
    </body>
  </html>
`;

router.get('/', (req, res) => {
  res.send(indexHTML);
});

// for testing
router.get('/secret', rLib.requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  hlpr.consLog(['index/secret']);
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.use('/auth', authRoutes);
// some open routes
router.use('/apiv1/events', eventsRoutes);
router.use('/apiv1/resource', resourceRoutes);
router.use('/apiv1/webhooks', webhooks);
// all requireAuth
router.use('/apiv1/activities', rLib.requireAuth, activitiesRoutes);
router.use('/apiv1/activity', rLib.requireAuth, activityRoutes);
router.use('/apiv1/routeplan', rLib.requireAuth, rteRoutes);
router.use('/apiv1/strava', rLib.requireAuth, stravaRoutes);
// all requireAdmin and requireAuth
router.use('/apiv1/admin', rLib.requireAuth, rLib.requireAdmin, adminRoutes);

// for letsencrypt setup
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
