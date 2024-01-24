const mongoose = require('mongoose');

const massageSchema = new mongoose.Schema({

  addmassage: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
  },
  teacherEmail: {
    type: String,
  },
  date:{
    type: Date,
  }
});

const Massage = mongoose.model('Massage', massageSchema);

module.exports = Massage;
