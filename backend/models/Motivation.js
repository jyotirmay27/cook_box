const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;


const motivationSchema = new Schema({
    name: { type: String , required: true},
    li: { type: String , required: true }, //the database will contain a row for '' in it
    
})
// just to ensure the user is unique
module.exports = mongoose.model('Motivation', motivationSchema)