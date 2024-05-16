const router = require('express').Router();
//Import necessary routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

//Sets up the routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//Exports the router
module.exports = router;