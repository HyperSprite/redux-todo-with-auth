const fs = require('fs');
const path = require('path');
if (fs.existsSync(`${__dirname}/config.js`)) {
  const config = require('./config');
  config.loadConfig();
}

const pckg = require('../../package.json');

const currentVersion = pckg.version.slice(0, 3) * 1;
process.env.CURRENT_SCHEMA = process.env.CURRENT_SCHEMA || currentVersion;
process.env.LOGGING = process.env.LOGGING || 'normal';

const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const router = require('./router');
const hlpr = require('./lib/helpers');
const nexmo = require('./services/nexmo');

const app = express();
const isSSL = fs.existsSync(`${__dirname}/../ssl/cert.pem`);
const rootDir = `${__dirname}/${process.env.SITE_PUBLIC}/`;
const blogStatic = `${__dirname}/blog/`;
const port = process.env.PORT;
const portS = (port * 1) + 363;

let httpServer;

const contStrava = require('./controllers/strava');
const dailyUserUpdate = contStrava.dailyUserUpdate;
const contActivities = require('./controllers/activities');
const timerUpdateUserActivities = contActivities.getExtendedActivityStats;

isSSL ?
  console.log('**** Using local SSL certs') :
  console.log('**** No local SSL certs');
  console.log(`**** CERT = ${process.env.CERT}`);

// redirect if insecure and SSL
const secureHost = (req, res, next) => {
  if (!req.secure) {
    if (isSSL) {
      return res.redirect(`https://${req.hostname}:${portS}${req.url}`);
    } else if (process.env.CERT === 'true' && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    return next();
  }
  return next();
};

// Webpack dev server setup
if (!hlpr.isProd() && process.env.NODE_ENV !== 'API-ONLY') {
  hlpr.consLog(['**** Using Webpack Dev Middleware']);
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../webpack.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
  // app.use(morgan('combined'));
}

mongoose.plugin(require('./models/middleware-current-schema'));

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
});

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

// Express Middleware
app.use(secureHost);
// compression
app.use(compression({ filter: shouldCompress }));
// app.use(cors());
// parses everything that comes in as JSON
app.use(bodyParser.json({ type: '*/*' }));

app.use('/blog', express.static(`${rootDir}blog`, { maxAge: 0 }));
app.use(express.static(rootDir, { maxAge: '30d' }));

app.use('/', router);

// 404 catch-all handler (middleware)
app.use((req, res) => {
  console.log(`>>>> 404 URL : ${req.url}`);
  console.log(`>>>> 404 IP  : ${req.ip}`);
  res.redirect('/');
});

// 500 error handler (middleware)
app.use((err, req, res) => {
  console.log('!!!! 500 ', err.stack);
  res.status(500).render('500');
});

const runtimeSettings = `${process.env.NODE_ENV} v${pckg.version} log: ${process.env.LOGGING}`;
if (process.env.NODE_ENV === 'production') {
  hlpr.getDateLocal('America/Los_Angeles', 'YYYY-MM-DD HH:mm', (date) => {
    const txtMessage = `${date} - ARaceathlete started ${runtimeSettings}`;
    nexmo.sendText(process.env.ADMIN_TXT_NUMBER, txtMessage);
  });
}

// HTTPS
if (isSSL) {
  httpServer = https.createServer({
    key: fs.readFileSync(`${__dirname}/../ssl/cert.pem`),
    cert: fs.readFileSync(`${__dirname}/../ssl/cert.crt`),
  }, app).listen(portS, () => {
    console.log(`**** HTTPS https://localhost:${port} ${runtimeSettings}`);
  });
  const insecureServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP http://localhost:${port} ${runtimeSettings}`);
  });
} else {
  httpServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP http://localhost:${port} ${runtimeSettings}`);
  });
}
