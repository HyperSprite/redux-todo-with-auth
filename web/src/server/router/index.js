const express = require('express');
const router = require('express').Router();
const path = require('path');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const config = require('./../config');

const authRoutes = require('./auth');
const apiv1Routes = require('./apiv1');


const rootDir = `${__dirname}/../${config.public}/assets`;


router.get('/', (req, res) => {
  res.sendFile(path.resolve(rootDir, 'index.html'));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});
router.use('/auth', authRoutes);
router.use('/apiv1', apiv1Routes);

module.exports = router;
