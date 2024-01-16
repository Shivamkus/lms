// const mongoose = require('mongoose');

// const signupSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type: String,
//         required:true
//     }
// },
// {timestamps:true}
// );
// const SignUp = mongoose.model('SignUp', signupSchema);
// module.exports = SignUp;

const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    email:{
      type: String,
      required: true,
      unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
          type:String,
          required:true
    }
},
    {
        timestamps:true
    }

);

const User =  mongoose.model('User',userSchema);
module.exports = User;
