const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const uploadSchema = new Schema({
    name: { type: String },
    userid: { type: String }, //the database will contain a row for '' in it
    image: { type: String },

    ing1:{ type: String },
    ing2:{ type: String },
    ing3:{ type: String },
    ing4:{ type: String },
    rate: {
        type: [Number],
        default: []
    },

    

    
    
});

// just to ensure the user is unique
module.exports = mongoose.model('Upload', uploadSchema);