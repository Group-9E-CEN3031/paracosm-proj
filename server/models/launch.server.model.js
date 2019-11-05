var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var launchSchema = new Schema({

    uuid: {type: String, required: true},
    data: {type: String, required: true},
    created_at: Date
}, 
{collection: 'launch'} );

launchSchema.pre('save', function(next) {
    if(!this.created_at)
        this.created_at = new Date();
});

var Launch = mongoose.model('Launch', launchSchema);

module.exports = Launch;