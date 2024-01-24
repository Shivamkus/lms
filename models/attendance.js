// models/attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, maxlength:15},
  present: { type: Boolean, default: false },
  userName :{type:String,required: true},
  userEmail :{type: String, required: true},
  user_id: {type :String, required :true}
  // additional fields as needed
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
