const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teachers_Controller');
const homeController =require('../controllers/home_Controller');
router.use(express.static('./assets'));
router.use(express.static('../assets'));

router.get('/', teacherController.teachers);
router.get('/home',teacherController.homeT);
router.get('/homepage',teacherController.homeTpage);

router.get('/about',teacherController.aboutT);
router.get('/aboutt',teacherController.aboutTpage)
router.get('/contactT',teacherController.contactTpage)
router.get('/allstudents',teacherController.AllStudents)
router.get('/courses',teacherController.coursesT);
router.get('/profile',teacherController.teachers_profile);
router.get('/profile/:id',teacherController.teacherprofilebyid);
router.get('/contact',teacherController.contactT);
router.get('/signup',teacherController.teachers_signup);
router.get('/login', teacherController.login);



router.post('/create-Teacher',teacherController.create);
router.post('/Create-Teacher-Session',teacherController.createSession);
router.get('/logout', async function (req, res) {
    // Clear the user's session
    req.session.destroy(function (err) {
        if (err) {
            console.log("Error destroying session:", err);
        }

        // Redirect the user to the home page (or any other desired page)
        res.redirect('/teachers/home');
    });
});






module.exports = router;