const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
    link:{
        type:String,
        required :true
      },
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
   

},{
    timestamps: true,
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
