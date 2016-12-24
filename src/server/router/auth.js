// const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const Authentication = require('./../controllers/authentication');
const Events = require('./../controllers/events');

// Auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireStravaRes = passport.authenticate('strava', { session: false, failWithError: true });

router.get('/strava', requireStravaRes, Authentication.stravaSignin, Authentication.signinError);

router.get('/user', requireAuth, Authentication.user);

router.post('/addevent', requireAuth, Events.addEvent);

module.exports = router;
