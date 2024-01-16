const mongoose = require('mongoose');

//  mongoose.connect('mongodb://localhost:27017/design');
mongoose.connect('mongodb+srv://kushwahshivam065:cQoRjTw0JGRLsX67@cluster0.60hjjed.mongodb.net/?retryWrites=true&w=majority');
 const db = mongoose.connection;

 db.on('error',console.error.bind(console, 'error on connecting database'));
 db.once('open',function(){
    console.log("connected to database :: mongoDB");
 });

 module.exports = db;
