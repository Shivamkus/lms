const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teachers_Controller');
router.use(express.static('./assets'));

router.get('/', teacherController.teachers);
router.get('/profile',teacherController.teachers_profile);
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
        res.redirect('back');
    });
});






module.exports = router;