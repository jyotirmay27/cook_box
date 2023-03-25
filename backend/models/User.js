const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String , required: true},
    email: { type: String , required: true , unique: true}, //the database will contain a row for '' in it
    password:{ type: String , required: true , minlength: 6}

    
    
});

// just to ensure the user is unique
module.exports = mongoose.model('User', userSchema);