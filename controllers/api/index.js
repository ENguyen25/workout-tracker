const router = require('express').Router();

const workoutsRoute = require('./workouts-route.js');

router.use('/workouts', workoutsRoute);

module.exports = router;
