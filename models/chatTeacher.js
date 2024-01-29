const mongoose = require('mongoose');
const ChatTeacherSchema = new mongoose.Schema({
    chatteacher: {
        type: String,
        required: true,
        maxlength: 1000,
      },
    teacherName: {
        type: String,
        required: true,
      },
      teacherEmail: {
        type: String,
        required: true,
      },
      teacher_id :{
        type: String,
        required: true,
      },
   

});

const ChatTeacher = mongoose.model('ChatTeacher', ChatTeacherSchema);
module.exports = ChatTeacher;