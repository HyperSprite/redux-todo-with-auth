const router = require('express').Router();

const rLib = require('./router-lib');

const Events = require('./../controllers/events');

router.get('/test', rLib.requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ test: 'Open' }));
});
router.get('/secret', rLib.requireAuth, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ secret: 'Authorized' }));
});

router.get('/', Events.getEvents);
router.get('/:eventId', Events.getEvent);
// require Auth
router.get('/:eventId/fav', rLib.requireAuth, Events.favEvent);
router.post('/addevent', rLib.requireAuth, Events.eventForm, Events.addEvent);
router.post('/delete', rLib.requireAuth, Events.delEvent);
router.post('/:eventId', rLib.requireAuth, Events.eventForm, Events.editEvent);

module.exports = router;
