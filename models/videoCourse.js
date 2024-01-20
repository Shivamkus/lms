// models/course.js
const mongoose = require('mongoose');

const videocourseSchema = new mongoose.Schema({
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

