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

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const mongoose = require('mongoose');
const morgan = require('morgan');

const router = require('./router');
const hlpr = require('./lib/helpers');
const txt = require('./services/nexmo');

const app = express();
const isSSL = fs.existsSync(`${__dirname}/../ssl/cert.pem`);
const rootDir = `${__dirname}/${process.env.SITE_PUBLIC}/`;
const blogStatic = `${__dirname}/blog/`;
const port = process.env.PORT;
const portS = (port * 1) + 363;

let httpServer;

const sockets = require('./sockets');
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
  const webpackConfig = require('../../webpack.dev');
  console.dir(webpackConfig);
  console.dir(webpackConfig.module.rules);
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
}

mongoose.plugin(require('./models/middleware-current-schema'));

mongoose.connect(process.env.MONGODB_URI, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.connection.on('error', (err) => {
  hlpr.getDateLocal('America/Los_Angeles', 'YYYY-MM-DD HH:mm', (date) => {
    const txtMessage = `${date} - ARaceathlete Mongoose error ${err}`;
    txt.sendText(process.env.ADMIN_TXT_NUMBER, txtMessage);
  });
});

function shouldCompress(req, res) {
  if (req.headers['x-no-compression'] || !hlpr.isProd()) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

// Express Middleware
app.use(secureHost);
app.use(helmet());
// compression
app.use(compression({ filter: shouldCompress }));
// app.use(cors());

app.use('/blog', express.static(`${rootDir}blog`, { maxAge: 0 }));
app.use(express.static(rootDir, { maxAge: '30d' }));

app.use(bodyParser.json());

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
if (process.env.NODE_ENV === 'production' && process.env.ROOT_URL !== 'http://localhost:3080') {
  hlpr.getDateLocal('America/Los_Angeles', 'YYYY-MM-DD HH:mm', (date) => {
    const txtMessage = `${date} - ARaceathlete started ${runtimeSettings} - ${process.env.ROOT_URL}`;
    txt.sendText(process.env.ADMIN_TXT_NUMBER, txtMessage);
  });
} else {
  console.log(`txtMessage: ${runtimeSettings} - ${process.env.ROOT_URL}`);
}

// HTTPS
if (isSSL) {
  httpServer = https.createServer({
    key: fs.readFileSync(`${__dirname}/../ssl/cert.pem`),
    cert: fs.readFileSync(`${__dirname}/../ssl/cert.crt`),
  }, app).listen(portS, () => {
    console.log(`**** isSSL: HTTPS https://localhost:${port} ${runtimeSettings}`);
  });
  const insecureServer = http.createServer(app).listen(port, () => {
    console.log(`**** isSSL: HTTP http://localhost:${port} ${runtimeSettings}`);
  });
} else {
  httpServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP ${process.env.ROOT_URL} ${runtimeSettings}`);
  });
}

sockets.startSockets(httpServer);
