var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var calibrationSchema = new Schema({

    uuid: {type: String, required: true},
    data: {type: String, required: true},
    created_at: Date
}, 
{collection: 'calibration'} );

calibrationSchema.pre('save', function(next) {
    if(!this.created_at)
        this.created_at = new Date();
});

var Calibration = mongoose.model('Calibration', calibrationSchema);

module.exports = Calibration;