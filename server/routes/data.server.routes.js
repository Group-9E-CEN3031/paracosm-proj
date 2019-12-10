var dataController = require('../controllers/data.server.controller.js'),
    express = require('express'),
    router = express.Router();

// Route for getting download links based on UUID
router.route('/:uuid')
    .get(dataController.getUrls);

// Route for handling empty UUID parameter
router.route('/')
    .get(dataController.emptyUUID);

router.param('uuid', dataController.getByUUID);

module.exports = router;