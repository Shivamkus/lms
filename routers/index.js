const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
const passport = require('passport');
const session = require('express-session');
const teacherController = require('./teacher');

console.log("router loaded");

// teacher controller
router.use('/teachers',teacherController);
router.use(express.static('./assets'));
router.use(express.static('../assets'));


router.get('/', homeController.home);
router.get('/home',homeController.home);
router.get('/home2',homeController.home2);

router.get('/students/home',homeController.home);
router.get('/teacher',homeController.teacher);
router.get('/about',homeController.about);
router.get('/contact',homeController.contact)
router.get('/profile',homeController.profile);
router.get('/register',homeController.Signup);
router.get('/login',homeController.login);
router.get('/courses',homeController.courses || homeController.getAllCourses);
router.get('/playlist',homeController.playlist);
router.get('/teacher_profile',homeController.teachers_profile);
router.get('/update',homeController.update);
router.get('/watch-video',homeController.watch_video);
router.get('/addCourse',homeController.AddCourse);
router.post('/create',homeController.create);
router.post('/addStudent',homeController.create)
router.post('/create-session',homeController.createSession);
router.post('/create-contact',homeController.createContact)
router.post('/user_Update',homeController.updateuser);

router.post('/addCourse',homeController.uploadFile);

// router.get('/logout',homeController.logout);
router.get('/logout', async function (req, res) {
    // Clear the user's session
    req.session.destroy(function (err) {
        if (err) {
            console.log("Error destroying session:", err);
        }

        // Redirect the user to the home page (or any other desired page)
        res.redirect('home');
    });
});



module.exports =router;