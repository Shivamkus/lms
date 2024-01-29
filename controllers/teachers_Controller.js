// require all schemas
const Teacher = require("../models/teacher");
const User = require("../models/user");
const videoCourse = require("../models/videoCourse");
const Attendance = require('../models/attendance');
const Massage = require('../models/Massage');
const ChatTeacher = require('../models/chatTeacher');
const  Chatmassage  = require("../models/chatMassage");


// // post controller for the chat massages
// module.exports.ChatTeacher = async(req,res)=>{
//   try {
//     const { chatteacher, teacherName, teacherEmail , teacher_id} = req.body;
//     await ChatTeacher.create({ chatteacher, teacherName, teacherEmail , teacher_id});
//     console.log('chat massage successfully send',);
//     res.redirect('/teachers/home')
//   } catch (error) {
//     console.log("error on creating chat massages",error);
//     res.status(500).send('Internal Server Error');
//   }
//   };









// teachers controller for home page
module.exports.homeTpage = function (req, res) {
  return res.render("teacherhome");
};


// teachers controller for the about page
module.exports.aboutTpage = function (req, res) {
  return res.render("about_teacher");
};


// teachers controller for the contact us page
module.exports.contactTpage = function (req, res) {
  return res.render("contactTeacher");
};


// teachers contoller for the teachers page
module.exports.teachers = async function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.redirect("/teachers/login");
  }
  try {
    const teacherss = await Teacher.find({});
    const isTeacherAuthenticated = Boolean(req.session.teacher);
    return res.render("teachers", {
      title: "teachers || Profile",
      teacher_list: teacherss,
      isTeacherAuthenticated: isTeacherAuthenticated,
      teacherName: teacher.name,
    });
  } catch (error) {
    console.log("error on finding teachers");
  }
};

// teachers controller for the get all studnets in one page
module.exports.AllStudents = async function (req, res) {
  const teacher = req.session.teacher;

  if (!teacher) {
    return res.redirect("/teachers/login");
  }


  try {
    const attendace = await Attendance.find({ });
    const students = await User.find({});
    const isTeacherAuthenticated = Boolean(req.session.teacher);
    return res.render("AllStudents", {
      title: "students || Profile",
      student_list: students,
      isTeacherAuthenticated: isTeacherAuthenticated,
      list: attendace,
      teacherName: teacher.name,
    });

  } catch (error) {
    console.log("error on finding teachers");
  }

  try {
    // Fetch attendance data from the database
    const attendanceData = await Attendance.find();
    const events = attendanceData.map(entry => ({
      title: entry.present ? 'Present' : 'Absent',
      start: entry.date.toISOString(),
      end: entry.date.toISOString(),
    }));

    // Render the calendar view with events

    res.render('index', { events });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
  
};

// teacher controller for the get teacher profile
module.exports.teachers_profile = function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.redirect("/teachers/login");
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);

  return res.render("teacher_profile", {
    title: "teachers || Profile",
    isTeacherAuthenticated: isTeacherAuthenticated,
    teacherName: teacher.name,
  });
};

// teachers home page contoller after login 
module.exports.homeT = async function (req, res) {
  const teacher = req.session.teacher;
  const teacherss = await Teacher.find({});
  const Chatteachers = await ChatTeacher.find({ });
  const chatmassages_list = await Chatmassage.find({ });
  if (!teacher) {
    return res.redirect("/teachers/homepage");
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);

  return res.render("homeT", {
    title: "teachers home page",
    isTeacherAuthenticated: isTeacherAuthenticated,
    teacherName: teacher.name,
    teacherEmail: teacher.email,
    teacher_id : teacher.id,
    teachers_lists : teacherss,
    chatteacher_list : Chatteachers,
    chatmassages_list,
  });
};

// teachers about page after login
module.exports.aboutT = function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.render("about_teacher", {
      isTeacherAuthenticated: false,
    });
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);

  return res.render("aboutT", {
    title: "teachers home page",
    isTeacherAuthenticated: isTeacherAuthenticated,
    teacherName: teacher.name,
  });
};

// teacher courses page after login
module.exports.coursesT = function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.redirect("/home");
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);
  return res.render("coursesT", {
    title: "teachers home page",
    isTeacherAuthenticated: isTeacherAuthenticated,
    teacherName: teacher.name,
  });
};

// teachers contact us page after login
module.exports.contactT = function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.render("contactTeacher", {
      isTeacherAuthenticated: false,
    });
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);

  return res.render("contactT", {
    title: "teachers contact page",
    isTeacherAuthenticated: isTeacherAuthenticated,
    teacherName: teacher.name,
    teacherEmail: teacher.email,
  });
};

// get teachers signup page
module.exports.teachers_signup = function (req, res) {
  return res.render("teacher_signup");
};

// get controller for the teacher login page
module.exports.login = function (req, res) {
  return res.render("teacher_login");
};

// get contoller for open teachers profile by id
module.exports.teacherprofilebyid = async function (req, res) {
  const teacher = req.session.teacher;
  if (!teacher) {
    return res.render("/teachers/login", {
      isTeacherAuthenticated: false,
    });
  }
  const isTeacherAuthenticated = Boolean(req.session.teacher);
  try {
    const id = req.params.id; 
    const teacher = await Teacher.findById(id);
    // const videocourseAndTeacher = await videoCourse.findById({ teacher_id });

    
    return res.render("teacherID", {
      teacher,
    //   videoCourses: videocourseAndTeacher,
      isTeacherAuthenticated: isTeacherAuthenticated,
      //  teacherName: teacher.name,
      //  teacherEmail: teacher.email,
    });
  } catch (error) {
    console.log("Error on finding teacher by ID:", error);
    res.status(500).send("Internal Server Error");
  }
};

//  post controller for signup route for teacher
module.exports.create = async function (req, res) {
  console.log("we are at Sign up");
  if (req.body.password != req.body.confirm_password) {
    console.log(req.body.password + " " + req.body.confirm_password);
    return res.redirect("back");
  }
  try {
    const teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      console.log("User is already exist");
      return res.redirect("back");
    } else {
      const newTeacher = await Teacher.create(req.body);
      if (!newTeacher) {
        console.log("error on creating new teacher");
        return res.redirect("back");
      }
      console.log("Teachers registraion successfully");
      return res.redirect("/teachers/login");
    }
  } catch (error) {
    console.log("error on catch ", error);
  }
};

// post controller for login route for the teacher
module.exports.createSession = async function (req, res) {
  console.log("we are at sign in");
  try {
    const teacher = await Teacher.findOne({
      email: req.body.email,
      number: req.body.number,
    });
    if (teacher) {
      if (
        teacher.password != req.body.password &&
        teacher.number != req.body.number
      ) {
        console.log("password is not matching");
        return res.redirect("back");
      }
      res.cookie("teachers_id", teacher.id);

      const teacherName = teacher.name;
      const teacherEmail = teacher.email;
      console.log("name", teacherName, teacherEmail);

      console.log("teacher_id: ", teacher.id);
      req.session.teacher = {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,

      };
      const isTeacherAuthenticated = Boolean(req.session.teacher);

      console.log("you are logged in successfully");
      return res.redirect("/teachers/home");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error on login", error);
  }
};

