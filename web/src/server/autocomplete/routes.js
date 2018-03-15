const router = require('express').Router();
const controller = require('./controller');

router.get('/distinct/:handler/:key', controller.handleDistinct);

module.exports = router;
