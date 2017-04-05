const router = require('express').Router();
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

const Events = require('./../controllers/events');

router.get('/test', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.get('/', Events.getEvents);
router.get('/:eventId', Events.getEvent);
router.get('/:eventId/fav', requireAuth, Events.favEvent);
router.post('/addevent', requireAuth, Events.eventForm, Events.addEvent);
router.post('/delete', requireAuth, Events.delEvent);
router.post('/:eventId', requireAuth, Events.eventForm, Events.editEvent);

module.exports = router;