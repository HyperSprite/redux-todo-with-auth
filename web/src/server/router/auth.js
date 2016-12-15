const express = require('express');
const router = require('express').Router();
const passport = require('passport');

const Authentication = require('./../controllers/authentication');
const passportService = require('./../services/passport');

// Auth middleware
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false, failWithError: true });
const requireStravaReq = passport.authenticate('strava');
const requireStravaRes = passport.authenticate('strava', { session: false, failWithError: true });

router.post('/signin', requireSignin, Authentication.signin, Authentication.signinError);
router.post('/signup', Authentication.signup);

// router.get('/strava', requireStravaReq);
router.get('/strava', requireStravaRes, Authentication.stravaSignin, Authentication.signinError);

router.get('/user', requireAuth, Authentication.user);

module.exports = router;
