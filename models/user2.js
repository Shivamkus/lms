// create a schema for the user registration by teachers.
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
  },
    email:{
      type: String,
      required: true,
      unique: true
    },
    password:{
        type:String,
        required:true
    },
    roll:{
          type:String,
          required:true
    },
},
    {
        timestamps:true
    }

);

const User2 =  mongoose.model('User2',userSchema);
module.exports = User2;