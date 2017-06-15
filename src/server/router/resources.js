const router = require('express').Router();

const Resources = require('./../controllers/resources');

router.get('/:resTarget', Resources.resource);

module.exports = router;
