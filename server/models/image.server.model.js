var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var imageSchema = new Schema({
    
    uuid: {type: String, required: true},
    data: {type: String, required: true},
    created_at: Date
}, 
{collection: 'images'} );

imageSchema.pre('save', function(next) {
    if(!this.created_at)
        this.created_at = new Date();
});

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;