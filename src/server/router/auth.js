// const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const rLib = require('./router-lib');

const Authentication = require('./../controllers/authentication');
const Events = require('./../controllers/events');

// Auth middleware
const requireStravaRes = passport.authenticate('strava', { session: false, failWithError: true });

router.get('/strava', requireStravaRes, Authentication.stravaSignin, Authentication.signinError);

router.get('/user', rLib.requireAuth, Authentication.user);
router.post('/addevent', rLib.requireAuth, Events.addEvent);

module.exports = router;
