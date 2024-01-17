const express = require('express');
const app = express();
const port = 5000;
// const bcrypt = require('bcrypt');

// const expressLayout = require('express-ejs-layouts');
const cookie = require('cookie-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const db =require('./config/db');
const SignUp = require('./models/user');
const session = require('express-session');
const multer = require('multer');



app.use(session({
    secret: 'student',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust this based on your deployment (e.g., enable secure cookies in production)

}));





app.use(express.urlencoded({ extended: true }));
app.use(express.static('./assets'));
app.use(cookieParser());
// app.use(expressLayout);

app.use('/',require('./routers'));

app.set('view engine', 'ejs');
app.set('views','./views');



const storage = multer.diskStorage({
  destination : function(req , file, cb){
      return cb(null, './assets/uploads');
  },
  filename : function(req,file, cb){
      return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({storage});


app.use(express.urlencoded({extended: false}));



app.get('/addcourse',function( req,res){
return res.render('add_course');
});



// app.post('/uploads',upload.single('imageFile') ,(req,res)=>{
//         console.log(req.body);
//         console.log(req.file);

//         return res.redirect('back');
// });


app.post('/uploads',upload.single('course') ,(req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect('back');
});





app.listen(port,function(err){
    if(err){
        console.log("error on running server",err);
    }else{
        console.log("server is running on port :",5000);
        console.log(`http://localhost:${port}`);
    }
})