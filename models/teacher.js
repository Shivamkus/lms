// create a schema for the teachers 
const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name:{
        type: String,
        reauired: true,
    },
    email:{
        type: String,
        required :true,
        unique : true,
    },
    number:{
        type: Number,
        required: true
    },
    password:{
        type :String,
        required: true
    }
});
const Teacher = mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;