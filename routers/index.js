// create routes of the studnts

// require all the depandencies and controllers and models
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_Controller");
const passport = require("passport");
const session = require("express-session");
const teacherController = require("./teacher");

console.log("router loaded");

// teacher controller
router.use("/teachers", teacherController);
router.use(express.static("./assets"));
router.use(express.static("../assets"));

// here get all the routes of students
router.get("/", homeController.home11);
router.get("/home", homeController.home);
router.get("/home2", homeController.home2);
router.post("/addComments", homeController.addcomments);
router.get("/students/home", homeController.home);
router.get("/teacher", homeController.teacher);
router.get("/about", homeController.about);
router.get("/contact", homeController.contact);
router.get("/profile", homeController.profile);
router.get("/register", homeController.Signup);
router.get("/login", homeController.login);
router.get("/courses", homeController.courses || homeController.getAllCourses);
router.get("/course", homeController.dashbord);
router.get("/watch-video", homeController.dashbordvideo);

router.get("/playlist", homeController.playlist);
router.get("/teacher_profile", homeController.teachers_profile);
router.get("/update", homeController.update);
// router.get("/watch-video", homeController.watch_video);
router.get("/addCourse", homeController.AddCourse);

// here all post controllers of the user
router.post("/create", homeController.create);
router.post("/addStudent", homeController.create1);
router.post("/create-session", homeController.createSession);
router.post("/create-contact", homeController.createContact);
router.post("/user_Update", homeController.updateuser);
router.post("/addCourse", homeController.uploadFile);
router.post('/markAttendance',homeController.makeAttendance);
router.post('/addmassages',homeController.addmassages)
router.post('/schedule',homeController.addSchedule)

// here logout controller
router.get("/logout", async function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log("Error destroying session:", err);
    }
    res.redirect("home");
  });
});

const VideoCourse = require('../models/videoCourse');
router.get('/api', async (req, res) => {
  try {
    // Fetch all video courses from the database
    const videoCourses = await VideoCourse.find();

    res.status(200).json(videoCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
