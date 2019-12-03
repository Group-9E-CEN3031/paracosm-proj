var dataController = require('../controllers/data.server.controller.js'),
    express = require('express'),
    router = express.Router();

router.route('/:uuid')
    .get(dataController.getUrls);

router.route('/')
    .get(dataController.emptyUUID);

router.param('uuid', dataController.getByUUID);

module.exports = router;

/*router.route('/launch/:launchID')
    .get(dataController.list)
    .delete(dataController.delete);

router.route('/launch')
    .post(dataController.setTypeLaunch, dataController.create);

router.route('/launch/:launchID/download')
    .get(dataController.read);

router.route('/calibration/:calibrationID')
    .get(dataController.list)
    .delete(dataController.delete);

router.route('/calibration')
    .post(dataController.setTypeCalibration, dataController.create);

router.route('/calibration/:calibrationID/download')
    .get(dataController.read);

router.route('/image/:imageID')
    .get(dataController.list)
    .delete(dataController.delete);

router.route('/image')
    .post(dataController.setTypeImage, dataController.create);

router.route('/image/:imageID/download')
    .get(dataController.read);

router.param('launchID', dataController.launchByID);
router.param('calibrationID', dataController.calibrationByID);
router.param('imageID', dataController.imageByID);*/