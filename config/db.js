const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/design');
// mongoose.connect('mongodb+srv://kushwahshivam065:cQoRjTw0JGRLsX67@cluster0.60hjjed.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://soumyasri2245:Soumya22%4034@cluster0.u2ywt3o.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });

 const db = mongoose.connection;

 db.on('error',console.error.bind(console, 'error on connecting database'));
 db.once('open',function(){
    console.log("connected to database :: mongoDB");
 });

 module.exports = db;
