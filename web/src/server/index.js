const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const router = require('./router');

const app = express();
const isSSL = fs.existsSync(`${__dirname}/../ssl/cert.pem`);
const rootDir = `${__dirname}/${config.public}/`;
const port = process.env.PORT || config.port;
const portS = (port * 1) + 363;
const hlpr = require('./lib/helpers');
let httpServer;

const localMongoURI = !hlpr.isProd() ?
  config.mongoconnect.dev :
  config.mongoconnect.prod;

process.env.STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN || undefined;
process.env.STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID || config.stravaLogin.clientID;
process.env.STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET || config.stravaLogin.clientSecret;
process.env.STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || config.stravaLogin.redirectURI;
const mongoURI = process.env.MONGODB_URI || localMongoURI;

hlpr.isProd();

isSSL ?
  console.log('**** Using SSL certs') :
  console.log('**** No SSL certs');

// redirect if insecure and SSL
if (isSSL) {
  app.all(
    '*', (req, res, next) => {
      if (req.secure) {
        return next();
      }
      res.redirect(`https://${req.hostname}:${portS}${req.url}`);
    }
  );
}

// Webpack dev server setup
if (!hlpr.isProd()) {
  hlpr.consLog(['**** Using Webpack Dev Middleware']);
  const test = process.argv[2] || false;
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../webpack.dev.config');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
  // app.use(morgan('combined'));
}

mongoose.connect(mongoURI);
// Express Middleware
app.use(cors());
// parses everything that comes in as JSON
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(rootDir));

app.use('/', router);

// 404 catch-all handler (middleware)
app.use(
  (req, res) => {
    console.log(`>>>> 404 URL : ${req.url}`);
    console.log(`>>>> 404 IP  : ${req.ip}`);
    res.redirect('/');
  }
);

// 500 error handler (middleware)
app.use(
  (err, req, res) => {
    console.log('!!!! 500 ', err.stack);
    res.status(500)
       .render('500');
  }
);

// HTTPS
if (isSSL) {
  httpServer = https.createServer({
    key: fs.readFileSync(`${__dirname}/../ssl/cert.pem`),
    cert: fs.readFileSync(`${__dirname}/../ssl/cert.crt`),
  }, app).listen(portS, () => {
    console.log(`**** HTTPS ${app.get('env')} https://localhost:${portS}`);
  });
  const insecureServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP ${app.get('env')} http://localhost:${port}`);
  });
} else {
  httpServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP ${app.get('env')} http://localhost:${port}`);
  });
}
