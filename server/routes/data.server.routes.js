var dataController = require('../controllers/data.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/launch/:launchID')
    .get(dataController.list)
    .post(dataController.create)
    .delete(dataController.delete);

router.route('/launch/:launchID/download')
    .get(dataController.read);

router.route('/calibration/:calibrationID')
    .get(dataController.list)
    .post(dataController.create)
    .delete(dataController.delete);

router.route('/calibration/:calibrationID/download')
    .get(dataController.read);

router.route('/image/:imageID')
    .get(dataController.list)
    .post(dataController.create)
    .delete(dataController.delete);

router.route('/image/:imageID/download')
    .get(dataController.read);

router.param('launchID', dataController.launchByID);
router.param('calibrationID', dataController.calibrationByID);
router.param('imageID', dataController.imageByID);

module.exports = router;