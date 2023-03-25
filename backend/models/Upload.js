const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const uploadSchema = new Schema({
    name: { type: String , required: true},
    userid: { type: String , required: true}, //the database will contain a row for '' in it
    image: { type: String, required: true },

    ing1:{ type: String },
    ing2:{ type: String },
    ing3:{ type: String },
    ing4:{ type: String } 

    

    
    
});

// just to ensure the user is unique
module.exports = mongoose.model('Upload', uploadSchema);