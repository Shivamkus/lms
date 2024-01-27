// require here all the schemas
const Course = require("../models/course");
const Teacher = require("../models/teacher");
const User = require("../models/user");
const Contact = require("../models/contact");
const VideoCourse = require("../models/videoCourse");
const Comment = require("../models/comment");
const Attendance = require('../models/attendance');
const Massage = require('../models/Massage');
const Schedule = require('../models/schedule');
const Test = require('../models/test');

// create a post controller for the add schedule
module.exports.addSchedule = async(req,res)=>{

  try {
    const { date, time, description } = req.body;

    // Validate input (add more validation as needed)
    if (!date || !time || !description) {
      console.log({ error: 'Incomplete data provided' });
      return res.redirect('/addCourse');
    }

    // Create a new schedule
    const newSchedule = new Schedule({
      date,
      time,
      description,
    });

    // Save the schedule to the database
    await newSchedule.save();
    console.log("time and schedule added");
    return res.redirect('/addCourse')

    // res.status(201).json({ message: 'Event scheduled successfully' });
  } catch (error) {
    console.error(error);
    console.log({ error: 'Internal Server Error' });
  }
}

// post controller for the add massages by teacher
module.exports.addmassages = async (req,res)=>{
  try {
    const newmassage = await Massage.create({
      addmassage : req.body.addmassage,
      teacherName : req.body.teacherName,
      teacherEmail : req.body.teacherEmail,
    });
     console.log("massage created successfully", newmassage);
   return res.redirect('/addCourse'); // Redirect to a success page or back to the form
  } catch (error) {
    console.log("error in creating new massage",error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports.addtest = async (req,res)=>{
  try {
    const newTest = await Test.create({
      link : req.body.link,
      teacherName : req.body.teacherName,
      teacherEmail : req.body.teacherEmail,
      teacher_id : req.body.teacher_id,

    });
     console.log("massage created successfully", newTest);
   return res.redirect('/addCourse'); // Redirect to a success page or back to the form
  } catch (error) {
    console.log("error in creating new massage",error);
    res.status(500).send('Internal Server Error');
  }
}
// controller for the make attendace
module.exports.makeAttendance = async (req, res) => {
  try {
    // Handle marking attendance and saving to the database
    const { date, present, userName, userEmail, user_id } = req.body;
    await Attendance.create({ date, present,userName, userEmail, user_id });
    console.log('attendance submitted');
    res.redirect('/home');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// controller for the post addcomments
module.exports.addcomments = async (req, res) => {
  try {
    const { userName, userEmail, comment_box } = req.body;

    const newComment = new Comment({
      userName,
      userEmail,
      commentBox: comment_box,
    });

    await newComment.save();
    console.log(req.body, "commented seccesfully");
    res.redirect("/playlist"); // Redirect to the home page or wherever you want
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch and render images on dashboard
module.exports.dashbord = async function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }


  try {
    const course = await Course.find({}, { _id: 1, name: 1, fileName: 1 });
    const videoCourse = await VideoCourse.find(
      {}    );
     
    res.render("couseDashbord", {
      course,
      videoCourse,
      isAuthenticated: true,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.dashbordvideo = async function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }


  try {
    const course = await Course.find({}, { _id: 1, name: 1, fileName: 1 });
    const videoCourse = await VideoCourse.find({});
    const comments = await Comment.find({},
        "userName userEmail commentBox createdAt"
      ).sort({ createdAt: -1 });
    res.render("video_playlist", {
      course,
     videoCourse,
     userName: user.name,
     userEmail: user.email,
     isAuthenticated: true,
     comments,
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// get a home page of first time teacher and studnts get this
module.exports.home11 = function (req, res) {
  return res.render("home11");
};

//  post controller for the add files
exports.uploadFile = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file.path;

    // Create a new course with data from the form
    const newCourse = new Course({
      name,
      file,
    });

    // Save the course to the database
    await newCourse.save();
    res.redirect("/courses");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// get controller for the courses
exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find({});
    res.render("courses", { courses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// home page get controller
module.exports.home = async function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.render("home", {
      title: "home || Page",
      isAuthenticated: false,
    });
  }
try {
  const allTeachers = await Teacher.find({ });
  const newSchedule = await Schedule.find({ });
  const newmassage = await Massage.find({ });
  const newTest = await Test.find( { });
  return res.render("home", {
    title: "home || Page",
    isAuthenticated: true,
    userName: user.name,
    userEmail : user.email,
    user_id : user.id,
    Massage_list : newmassage,
    Schedule_list : newSchedule,
    teacher_list : allTeachers,
    test_list : newTest,
  });

  
} catch (error) {
  console.log("error in massages",error);
}

  
};

module.exports.home2 = function (req, res) {
  const user = req.session.user;
  const teacher = req.session.teacher;

  if (!user && !teacher) {
    return res.render("home2", {
      title: "Home || Page",
      isAuthenticated: false,
    });
  }

  const isTeacherAuthenticated = Boolean(teacher);
  const isStudentAuthenticated = Boolean(user);

  if (isTeacherAuthenticated) {
    // Fetch teacher-specific data here
    // For example:
    const teacherData = {
      name: teacher.name,
      email: teacher.email,
      // Add other teacher-specific data
    };

    return res.render("home2", {
      title: "Home || Page",
      isAuthenticated: true,
      isTeacherAuthenticated: true,
      teacherData: teacherData,
    });
  } else if (isStudentAuthenticated) {
    // Fetch student-specific data here
    // For example:
    const studentData = {
      name: user.name,
      email: user.email,
      // Add other student-specific data
    };

    return res.render("home2", {
      title: "Home || Page",
      isAuthenticated: true,
      isTeacherAuthenticated: false,
      studentData: studentData,
    });
  }
};
// get controller for the about page
module.exports.about = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.render("about", {
      title: "about || Page",
      isAuthenticated: false,
    });
  }

  return res.render("about", {
    title: "about || Page",
    isAuthenticated: true,
    userName: user.name,
  });
};

// get controller for the contact us page
module.exports.contact = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.render("contact", {
      title: "contact || Page",
      isAuthenticated: false,
    });
  }

  return res.render("contact", {
    title: "contact || Page",
    isAuthenticated: true,
    userEmail: user.email,
    userName: user.name,
  });
};

// post controller create get in tuch , contact us 
module.exports.createContact = async function (req, res) {
  const newContact = await Contact.create({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    msg: req.body.msg,
  });
  try {
    console.log("massage sent", newContact);
    return res.redirect("back");
  } catch (error) {
    console.log("error", error);
  }
};

// get controller for the user profile
module.exports.profile = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("profile", {
    title: "Profile Page",
    userName: user.name,
    isAuthenticated: true,
  });
};

// get controller for the teacher panal
module.exports.teacher = async function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  try {
    const teacherss = await Teacher.find({});
    return res.render("teachersS", {
      title: "teachers Page",
      userName: user.name,
      isAuthenticated: true,
      teacher_list: teacherss,
    });
  } catch (error) {
    console.log("error on fatching teachers");
  }
};


module.exports.update = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("update", {
    title: "update Page",
    userName: user.name,
    userEmail: user.email,
    isAuthenticated: true,
  });
};

module.exports.teachers_profile = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("teacher_profile", {
    title: "teachers || Profile",
    isAuthenticated: true,
    userName: user.name,
  });
};

module.exports.AddCourse = function (req, res) {
  const user = req.session.user;
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.redirect("/teachers/login");
  }
  return res.render("add_course", {
    title: "add course",
    isAuthenticated: true,
    isTeacherAuthenticated: true,
    teacherName: teacher.name,
    teacherEmail: teacher.email,
    teacher_id: teacher.id,
  });
};

module.exports.courses = function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }
  return res.render("courses", {
    title: "course Page",
    userName: user.name,
    isAuthenticated: true,
  });
};

module.exports.watch_video = async function (req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/login");
  }

  try {
    const comments = await Comment.find(
      {},
      "userName userEmail commentBox createdAt"
    ).sort({ createdAt: -1 });
    return res.render("watch-video", {
      userName: user.name,
      userEmail: user.email,
      isAuthenticated: true,
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// playlist controller

module.exports.playlist =async function (req, res) {
  const user = req.session.user;
  const teacher = req.session.teacher;
  const comments = await Comment.find(
    {},
    "userName userEmail commentBox createdAt"
  ).sort({ createdAt: -1 });

  if (!user && !teacher) {
    return res.redirect("/login"); 
  }
  if (user) {
    return res.render("playlist", {
      title: "Playlist Page",
      userName: user.name,
      userEmail : user.email,
      isAuthenticated: true,
      role: "student",
      comments
    });
  } else if (teacher) {
    const isTeacherAuthenticated = Boolean(req.session.teacher);
    return res.render("playlist", {
      title: "Playlist Page",
      teacherName: teacher.name,
      isTeacherAuthenticated: isTeacherAuthenticated,
      role: "teacher",
    });
  }
};

// render to singup page
module.exports.Signup = function (req, res) {
  return res.render("register", {
    title: "register || Page",
  });
};

// render to login page
module.exports.login = function (req, res) {
  return res.render("login", {
    title: "login || Page",
  });
};


// post controller for the sign up data
module.exports.create = async function (req, res) {
  console.log("we are at Sign up");
  if (req.body.password != req.body.confirm_password) {
    console.log(req.body.password + " " + req.body.confirm_password);
    return res.redirect("back");
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User is already exist");
      return res.redirect("back");
    } else {
      const newUSer = await User.create(req.body);
      if (!newUSer) {
        console.log("error on creating new user");
        return res.redirect("back");
      }
      console.log("registraion successfully");
      return res.redirect("/login");
    }
  } catch (error) {
    console.log("error on catch ", error);
  }
};

// post controller for the add student by teacher side
module.exports.create1 = async function (req, res) {
  console.log("we are at Add student by teacher");
  if (req.body.password != req.body.confirm_password) {
    console.log(req.body.password + " " + req.body.confirm_password);
    return res.redirect("back");
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User is already exist");
      return res.redirect("back");
    } else {
      const newUSer = await User.create(req.body);
      if (!newUSer) {
        console.log("error on creating new user");
        return res.redirect("back");
      }
      console.log("student added successfully");
      return res.redirect("/addCourse");
    }
  } catch (error) {
    console.log("error on catch ", error);
  }
};

 // post controller for the login route
module.exports.createSession = async function (req, res) {
  console.log("we are at sign in");
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      if (user.password != req.body.password) {
        console.log("password is not matching");
        return res.redirect("back");
      }
      res.cookie("user_id", user.id);

      const userName = user.name;
      console.log("name", userName);

      console.log("user_id: ", user.id);
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,

      };
      const isAuthenticated = Boolean(req.session.user);

      console.log("you are logged in successfully");
      return res.redirect("/home");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error on login", error);
  }
};

// post contoller for the update user
module.exports.updateuser = async function (req, res) {
  console.log("we are at Update Profile");
  if (!req.session.user) {
    console.log("User not authenticated");
    return res.redirect("/login"); 
  }

  const userId = req.session.user.id;
  const user = await User.findById(userId);

  if (!user) {
    console.log("User not found");
    return res.redirect("/login"); 
  }

  
  user.name = req.body.name;
  user.email = req.body.email;

  
  if (req.body.old_password && req.body.old_password !== user.password) {
    console.log("Old password is incorrect");
    return res.redirect("back"); 
  }

  if (req.body.password) {
    user.password = req.body.password;
  }

  try {
    const updatedUser = await user.save();
    console.log("Profile updated successfully");
    return res.redirect("/profile");
  } catch (error) {
    console.log("Error updating profile:", error);
    return res.redirect("back"); 
  }
};
