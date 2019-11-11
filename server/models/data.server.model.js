var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var dataSchema = new Schema({

    uuid: {type: String, required: true},
    data: {type: String, required: true},
    created_at: Date

});

dataSchema.pre('save', function(next) {
    if(!this.created_at)
        this.created_at = new Date();

    next();
});

// Third parameter is the collection name
var Launch = mongoose.model('Launch', dataSchema, 'launch');
var Image = mongoose.model('Image', dataSchema, 'images');
var Calibration = mongoose.model('Calibration', dataSchema, 'calibration');

var models = {
    launch: Launch,
    image: Image,
    calibration: Calibration
};

module.exports = models;