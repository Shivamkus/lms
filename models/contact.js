// create a schema for the contact us "give the feedback"
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    msg:{
        type: String,
        required: true
    }
    
});
 const Contact = mongoose.model('Contact',contactSchema);
 module.exports = Contact;