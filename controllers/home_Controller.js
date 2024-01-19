// controllers/courseController.js
const Course = require('../models/course');


// exports.showForm = (req, res) => {
//   res.render('addCourseForm');
// };

module.exports.home11 = function( req,res){
    return res.render('home11');
}

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
    res.redirect('/courses');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    // Fetch all courses from the database
    const courses = await Course.find({});
    res.render('courses', { courses });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};



module.exports.home = function(req,res){
  // Access the user information from the session
  const user = req.session.user
//   const isTeacherAuthenticated = Boolean(req.session.teacher);

  // check the user is login or not
  if(!user){
    return res.render('home',{
        title:"home || Page",
        isAuthenticated: false,
    });
  }
  
  
    return res.render('home',{
        title:"home || Page",
        isAuthenticated: true,
        userName: user.name,

    
    });
}
 
const Teacher = require('../models/teacher')

module.exports.home2 = function(req, res) {
    const user = req.session.user;
    const teacher = req.session.teacher;

    if (!user && !teacher) {
        return res.render('home2', {
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

        return res.render('home2', {
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

        return res.render('home2', {
            title: "Home || Page",
            isAuthenticated: true,
            isTeacherAuthenticated: false,
            studentData: studentData,
        });
    }
}


module.exports.about = function(req,res){
 // Access the user information from the session
 const user = req.session.user

 // check the user is login or not
 if(!user){
   return res.render('about',{
       title:"about || Page",
       isAuthenticated: false,


   });
 }

   return res.render('about',{
       title:"about || Page",
       isAuthenticated: true,

       userName: user.name,


   });
}


module.exports.contact = function(req,res){
    // Access the user information from the session
    const user = req.session.user
   
    // check the user is login or not
    if(!user){
      return res.render('contact',{
          title:"contact || Page",
          isAuthenticated: false,
   
   
      });
    }
   
      return res.render('contact',{
          title:"contact || Page",
          isAuthenticated: true,
        userEmail : user.email,
          userName: user.name,
   
   
      });
   }

const User = require('../models/user');
const Contact = require('../models/contact');

// create get in tuch = contactus routes data

module.exports.createContact = async function(req ,res){
    const newContact = await Contact.create({
        name: req.body.name,
        email : req.body.email,
        number : req.body.number,
        msg :req.body.msg,
    });
    try {
        console.log('massage sent',newContact);
        return res.redirect('back');
        
    } catch (error) {
        console.log("error",error);
    }
}

// module.exports.profile = function(req,res){
//     return res.render('profile',{

//     });

// }

module.exports.profile = function (req, res) {
    // Access user information from the session
    const user = req.session.user;

    // Check if the user is logged in
    if (!user) {
        return res.redirect('/login');
    }

    // Render the profile page with user information
    return res.render('profile', {
        title: "Profile Page",
        userName: user.name,
        isAuthenticated: true,

        // Add other user details as needed
    });
};

module.exports.teacher = function (req, res) {
    // Access user information from the session
    const user = req.session.user;

    // Check if the user is logged in
    if (!user) {
        return res.redirect('/login');
    }

    // Render the profile page with user information
    return res.render('teachersS', {
        title: "teachers Page",
        userName: user.name,
        isAuthenticated: true,

        // Add other user details as needed
    });
};
module.exports.update = function (req, res) {
    // Access user information from the session
    const user = req.session.user;

    // Check if the user is logged in
    if (!user) {
        return res.redirect('/login');
    }

    // Render the profile page with user information
    return res.render('update', {
        title: "update Page",
        userName: user.name,
        userEmail : user.email,

        isAuthenticated: true,

        // Add other user details as needed
    });
};

module.exports.teachers_profile = function(req,res){
    // Access user information from the session
    const user = req.session.user;

    // check if the user is logged in
    if(!user){

        return res.redirect('/login');

    }
    // render to the teachers cursers page with user information
    return res.render('teacher_profile',{
        title:"teachers || Profile",
        isAuthenticated: true,
   
        userName: user.name,
    });
    
}

module.exports.AddCourse = function(req,res){
    // Access user information from the session
    const user = req.session.user;
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.redirect('/teachers/login');

    }
    // render to the teachers cursers page with user information
    return res.render('add_course',{
        title:"add course",
        isAuthenticated: true,
        isTeacherAuthenticated :true,
   
        // userName: user.name,
        teacherName : teacher.name
    });
    
}


module.exports.courses = function (req, res) {
    // Access user information from the session
    const user = req.session.user;

    // Check if the user is logged in
    if (!user) {
        return res.redirect('/login');
    }

    // Render the courses page with user information
    return res.render('courses', {
        title: "course Page",
        userName: user.name,
        isAuthenticated: true,

        // Add other user details as needed
    });
};

module.exports.watch_video = function(req ,res){
    const user = req.session.user ;
    if(!user){
        return res.redirect('/login');

    }
  return  res.render("watch-video",{
    userName : user.name,
    isAuthenticated: true
  });
}

// module.exports.playlist = function (req, res) {
//     // Access user information from the session
//     const user = req.session.user;

//     // Check if the user is logged in
//     if (!user) {
//         return res.redirect('/login');
//     }

//     // Render the profile page with user information
//     return res.render('playlist', {
//         title: "Playlist Page",
//         userName: user.name,
//         isAuthenticated: true,

//         // Add other user details as needed
//     });
// };
// controllers/playlistController.js

module.exports.playlist = function (req, res) {
    // Access user and teacher information from the session
    const user = req.session.user;
    const teacher = req.session.teacher;

    // Check if either user or teacher is logged in
    if (!user && !teacher) {
        return res.redirect('/login'); // Redirect to the appropriate login route
    }

    // Determine the role and render the playlist page with appropriate information
    if (user) {
        // Render for students
        return res.render('playlist', {
            title: "Playlist Page",
            userName: user.name,
            isAuthenticated: true,
            role: "student",
            // Add other user details as needed
        });
    } else if (teacher) {
        // Render for teachers
        const isTeacherAuthenticated = Boolean(req.session.teacher);

        return res.render('playlist', {
            title: "Playlist Page",
            teacherName: teacher.name,
            isTeacherAuthenticated: isTeacherAuthenticated,
            role: "teacher",
            // Add other teacher details as needed
        });
    }
};


 // render to singup page
 module.exports.Signup = function(req,res){
    return res.render('register',{
        title:"register || Page"
    });
 }

 // render to login page
 module.exports.login = function(req,res){
    return res.render('login',{
        title:"login || Page"
    });
 }

// -----------------------------------------------------------------------------------------------------
  
   //  sign up data
   
  
   module.exports.create =  async function(req,res){
    console.log('we are at Sign up');
    if(req.body.password != req.body.confirm_password){
        console.log(req.body.password + " " + req.body.confirm_password);
        return res.redirect('back');
    }
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            console.log("User is already exist");
            return res.redirect("back");
        }else{
            const newUSer = await User.create(req.body);
            if(!newUSer){
                console.log("error on creating new user");
                return res.redirect('back');
            }
            console.log("registraion successfully");
            return res.redirect('/login');
        }
        
    } catch (error) {
        console.log("error on catch ",error);
    }
 }



// // login route
 module.exports.createSession = async function (req,res){

    console.log("we are at sign in");
    try {
        const user = await User.findOne({
        email: req.body.email
    });
    if(user){
        if(user.password != req.body.password){
            console.log("password is not matching");
            return res.redirect('back');
        }
        res.cookie('user_id', user.id);
        
const userName = user.name;
console.log("name", userName);

        console.log('user_id: ',user.id);
        req.session.user = {
            id: user.id,
            name: user.name,
            email : user.email
            
            // Add other user details as needed
        };
        const isAuthenticated = Boolean(req.session.user);

        console.log("you are logged in successfully");
        return res.redirect('/home');
    }else{
        return res.redirect('back');

    }
        
    } catch (error) {
        console.log("error on login",error);
    }
 }
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// login with   bcrypt password
// const bcrypt = require('bcrypt');
// const User = require('./path-to-your-user-model'); // Adjust the path based on your actual file structure


// module.exports.createSession = async function (req, res) {
//     console.log("we are at sign in");

//     try {
//         const user = await User.findOne({ email: req.body.email });

//         if (user) {
//             if (!user.password) {
//                 console.log("User object does not have a valid password field");
//                 return res.redirect('back');
//             }

//             const passwordMatch = await bcrypt.compare(String(req.body.password), String(user.password));
//             console.log("Entered password:", req.body.password);
//             console.log("Stored password:", user.password);
            

//             if (passwordMatch) {
//                 res.cookie('user_id', user.id);
//                 console.log("You are logged in successfully");
//                 return res.redirect('back');
//             } else {
//                 console.log("Incorrect password");
//                 return res.redirect('back');
//             }
//         } else {
//             console.log("User not found");
//             return res.redirect('/profile');
//         }

//     } catch (error) {
//         console.log("Error on login", error);
//         return res.redirect('back');
//     }
// };

// module.exports.logout = function (req,res){
//     res.session.distroy(function (err){
//         if(err){
//             console.log("error on distroying session",err);
//         }
//         res.redirect('/home');
//     })
// }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// update user

// ...

module.exports.updateuser = async function (req, res) {
    console.log('we are at Update Profile');

    // Check if the user is authenticated (you can customize this based on your authentication logic)
    if (!req.session.user) {
        console.log('User not authenticated');
        return res.redirect('/login'); // Redirect to the login page or handle as needed
    }

    // Fetch the user from the database based on the session
    const userId = req.session.user.id;
    const user = await User.findById(userId);

    if (!user) {
        console.log('User not found');
        return res.redirect('/login'); // Redirect to the login page or handle as needed
    }

    // Update user profile based on the form data
    user.name = req.body.name;
    user.email = req.body.email;

    // Check if the old password matches the stored password before updating
    if (req.body.old_password && req.body.old_password !== user.password) {
        console.log('Old password is incorrect');
        return res.redirect('back'); // Redirect back to the update profile page with an error message
    }

    // Update the password if a new password is provided
    if (req.body.password) {
        user.password = req.body.password;
    }

    // Save the updated user profile
    try {
        const updatedUser = await user.save();
        console.log('Profile updated successfully');
        return res.redirect('/profile'); // Redirect to the user profile page or another page as needed
    } catch (error) {
        console.log('Error updating profile:', error);
        return res.redirect('back'); // Redirect back to the update profile page with an error message
    }
};


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Assuming this is your route handler for rendering the update profile page
// module.exports.renderUpdateProfilePage = function (req, res) {
//     // Access the user information from the session
//     const user = req.session.user;

//     // Check if the user is authenticated
//     if (!user) {
//         return res.redirect('/login'); // Redirect to login if the user is not authenticated
//     }

//     // Render the update profile page with the user data
//     res.render('update', { user });
// };

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Assuming this is your updateProfileController.js

// const User = require('../models/user'); // Import your User model

// ...

// module.exports.updateUser = async function (req, res) {
//     console.log('we are at Update Profile');

//     // Check if the user is authenticated
//     const user = req.session.user;

//     if (!user) {
//         console.log('User not authenticated');
//         return res.redirect('/login'); // Redirect to login if the user is not authenticated
//     }

//     // Fetch the user from the database based on the session
//     const userId = user.id;
//     const existingUser = await User.findById(userId);

//     if (!existingUser) {
//         console.log('User not found');
//         return res.redirect('/login'); // Redirect to login if the user is not found
//     }

//     // Update user profile based on the form data
//     existingUser.name = req.body.name;
//     existingUser.email = req.body.email;

//     // Check if the old password matches the stored password before updating
//     if (req.body.old_password && req.body.old_password !== existingUser.password) {
//         console.log('Old password is incorrect');
//         return res.redirect('back'); // Redirect back to the update profile page with an error message
//     }

//     // Update the password if a new password is provided
//     if (req.body.password) {
//         existingUser.password = req.body.password;
//     }

//     // Save the updated user profile
//     try {
//         const updatedUser = await existingUser.save();
//         console.log('Profile updated successfully');

//         // Fetch the updated user data after saving to the database
//         const updatedUserData = await User.findById(updatedUser.id);

//         // Render the update profile page with the updated user data
//         return res.render('home', { user: updatedUserData });
//     } catch (error) {
//         console.log('Error updating profile:', error);
//         return res.redirect('back'); // Redirect back to the update profile page with an error message
//     }
// };

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++