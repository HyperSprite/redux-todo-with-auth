// const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const rLib = require('./router-lib');

const Auth = require('./../controllers/authentication');
const Events = require('./../controllers/events');

// Auth middleware
const requireStravaRes = passport.authenticate('strava', { session: false, failWithError: true });

router.get('/strava', requireStravaRes, Auth.stravaSignin, Auth.signinError);

router.get('/user', rLib.requireAuth, Auth.user);
router.post('/addevent', rLib.requireAuth, Events.addEvent);
router.patch('/clubNotice', rLib.requireAuth, Auth.toggleClubNotice);

module.exports = router;
