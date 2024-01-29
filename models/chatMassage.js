const mongoose = require('mongoose');
const ChatMassageSchema = new mongoose.Schema({
    chatmassages: {
        type: String,
        required: true,
        maxlength: 1000,
      },
    userName: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      user_id :{
        type: String,
        required: true,
      },
   

});

const Chatmassage = mongoose.model('Chatmassage', ChatMassageSchema);
module.exports = Chatmassage;