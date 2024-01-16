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


app.use(session({
    secret: 'student',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Adjust this based on your deployment (e.g., enable secure cookies in production)

}));





app.use(express.urlencoded());
app.use(express.static('./assets'));
app.use(cookieParser());
// app.use(expressLayout);

app.use('/',require('./routers'));

app.set('view engine', 'ejs');
app.set('views','./views');

//----------------------------------------------------------------------------------------------------

// app.use(passport.initialize());
// app.use(passport.session())

// app.use(passport.setAuthenticatedUser);

//-----------------------------------------------------------------------------------------------------------+++++++++++++++++++++++++++++++++--------------------------------------

// app.get('/',function(req,res){
//     return res.render('home',{
//         title:"home || Page"
//     });
// });
// app.get('/home',function(req,res){
//     return res.render('home',{
//         title:"home || Page"
//     });
// });

// app.get('/about',function(req,res){
//     return res.render('about',{
//         title:"About || Page"
//     });
// });

// app.get('/contact',function(req,res){
//     return res.render('contact',{
//         title:"contact || Page"
//     });
// });

// app.get('/courses',function(req,res){
//     return res.render('courses',{
//         title:"courses || Page"
//     });
// });

// app.get('/login',function(req,res){
//     return res.render('login',{
//         title:"login || Page"
//     });
// });

// app.get('/playlist',function(req,res){
//     return res.render('playlist',{
//         title:"playlist || Page"
//     });
// });

// app.get('/profile',function(req,res){
//     return res.render('profile',{
//         title:"profile || Page"
//     });
// });

// app.get('/register',function(req,res){
//     return res.render('register',{
//         title:"register || Page"
//     });
// });


// app.get('/teacher_profile',function(req,res){
//     return res.render('teacher_profile',{
//         title:"teacher_profile || Page"
//     });
// });
// app.get('/teachers',function(req,res){
//     return res.render('teachers',{
//         title:"teachers || Page"
//     });
// });
// app.get('/update',function(req,res){
//     return res.render('update',{
//         title:"updates || Page"
//     });
// });
// app.get('/watch-video',function(req,res){
//     return res.render('watch-video',{
//         title:"watch-video || Page"
//     });
// });





app.listen(port,function(err){
    if(err){
        console.log("error on running server",err);
    }else{
        console.log("server is running on port :",5000);
        console.log(`http://localhost:${port}`);
    }
})