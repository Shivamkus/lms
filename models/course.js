// models/course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
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

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

