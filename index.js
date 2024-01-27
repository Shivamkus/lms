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
const Course = require('./models/course');
const videoCourse = require('./models/videoCourse');



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





app.use(express.urlencoded({extended: false}));



app.get('/addcourse',function( req,res){
return res.render('add_course');
});



// app.post('/uploads',upload.single('imageFile') ,(req,res)=>{
//         console.log(req.body);
//         console.log(req.file);

//         return res.redirect('back');
// });


// app.post('/uploads',upload.single('course') ,(req,res)=>{
//   console.log(req.body);
//   console.log(req.file);
// console.log("course added seccessfully\n");
//   return res.redirect('back');
// });

const storage = multer.diskStorage({
  destination : function(req , file, cb){
      return cb(null, './assets/uploads/images');
  },
  filename : function(req,file, cb){
      return cb(null, `${file.originalname}`); // you can add here teacher id also..
  }
});

const upload = multer({storage});
app.post('/uploads', upload.single('imagefile'), async (req, res) => {
  try {
      const { playlist , name } = req.body;
      const { originalname, path } = req.file;

      // const image = new Image({ name, fileName: originalname });
      const image = new Course({ playlist, name, fileName: originalname });

      await image.save();
     console.log("file uploaded successfully");
      res.redirect('/teachers/home');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});


/// create a multer controller for the video upload and fatch

const storagevideo = multer.diskStorage({
  destination : function(req , file, cb){
      return cb(null, './assets/uploads/videos');
  },
  filename : function(req,file, cb){
      return cb(null, `${file.originalname}`); // you can add here teacher id also..
  }
});
const uploadvideo = multer({storage:storagevideo});


app.post('/uploads1', uploadvideo.single('videofile'), async (req, res) => {
  try {
      const { playlist , name ,teacherName, teacherEmail,teacher_id } = req.body;
      const { originalname, path } = req.file;

      // const image = new Image({ name, fileName: originalname });
      const video = new videoCourse({ playlist, name, fileName: originalname ,teacherName, teacherEmail,teacher_id });
      await video.save();
     console.log("video uploaded successfully");
      res.redirect('/teachers/home');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});



// const storagetest = multer.diskStorage({
//     destination : function(req , file, cb){
//         return cb(null, './assets/uploads/test');
//     },
//     filename : function(req,file, cb){
//         return cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });


  
// //   const uploadtest = multer({storagetest});
//   const uploadtest = multer({ storage: storagetest });

// app.post('/addTest',uploadtest.single('test') ,(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);
//     console.log("test upload successfully");
//     return res.redirect('back');
//   });





app.listen(port,function(err){
    if(err){
        console.log("error on running server",err);
    }else{
        console.log("server is running on port :",5000);
        console.log(`http://localhost:${port}`);
    }
})