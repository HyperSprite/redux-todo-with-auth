const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/test', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});
module.exports = router;
