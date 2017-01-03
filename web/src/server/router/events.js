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
router.post('/:eventId', requireAuth, Events.editEvent);
router.post('/addevent', requireAuth, Events.addEvent);
router.post('/delete', requireAuth, Events.delEvent);

module.exports = router;
