// create a schema for the users
const mongoose = require('mongoose');

const videocourseSchema = new mongoose.Schema({
  teacherName:{
    type:String,
    required :true
  },
   teacherEmail:{
    type:String,
    required :true
  },
   teacher_id:{
    type:String,
    required :true
  },
  playlist:{
    type:String,
    required :true
  },
  
  name: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

const videoCourse = mongoose.model('videoCourse', videocourseSchema);

module.exports = videoCourse;

