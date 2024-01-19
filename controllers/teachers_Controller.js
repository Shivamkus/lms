// module.exports.teachers = function (req,res){
//     const teacher = req.session.teacher;


//     if(!teacher){

//         return res.redirect('/teachers/login');

//     }
//     // render to the teachers cursers page with user information
//     return res.render('teachers',{
//         title:"teachers || Profile",
//         isTeacherAuthenticated: true,
//         teacherName: teacher.name,
//     });
// }

// controllers/teachers_Controller.js

// ...
module.exports.homeTpage = function(req,res){
    return res.render('teacherhome');
}

module.exports.aboutTpage = function(req,res){
    return res.render('about_teacher');
}

module.exports.contactTpage = function(req,res){
    return res.render('contactTeacher');
}

module.exports.teachers = function (req, res) {
    const teacher = req.session.teacher;

    if (!teacher) {
        return res.redirect('/teachers/login');
    }

    // Move the authentication-related code here
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // Render to the teachers page with user information
    return res.render('teachers', {
        title: "teachers || Profile",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
    });
}

// ...




module.exports.teachers_profile = function(req,res){
    // Access user information from the session
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.redirect('/teachers/login');
    }
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // render to the teachers cursers page with user information
    return res.render('teacher_profile',{
        title:"teachers || Profile",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
    });
    
}
module.exports.homeT = function(req,res){
    // Access user information from the session
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.redirect('/teachers/homepage');
    }
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // render to the teachers cursers page with user information
    return res.render('homeT',{
        title:"teachers home page",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
    }); 
}
module.exports.aboutT = function(req,res){
    // Access user information from the session
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.render('about_teacher',{
        isTeacherAuthenticated:false
        });
    }
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // render to the teachers cursers page with user information
    return res.render('aboutT',{
        title:"teachers home page",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
    }); 
}

module.exports.coursesT = function(req,res){
    // Access user information from the session
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.redirect('/home');
    }
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // render to the teachers cursers page with user information
    return res.render('coursesT',{
        title:"teachers home page",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
    }); 
}

module.exports.contactT = function(req,res){
    // Access user information from the session
    const teacher = req.session.teacher;

    // check if the user is logged in
    if(!teacher){

        return res.render('contactTeacher',{
            isTeacherAuthenticated:false
        });
    }
    const isTeacherAuthenticated = Boolean(req.session.teacher);

    // render to the teachers cursers page with user information
    return res.render('contactT',{
        title:"teachers contact page",
        isTeacherAuthenticated: isTeacherAuthenticated,
        teacherName: teacher.name,
        teacherEmail: teacher.email,
    }); 
}

module.exports.teachers_signup = function(req ,res){
    return res.render('teacher_signup');
}
module.exports.login = function(req,res){
    return res.render('teacher_login');
}

const Teacher = require('../models/teacher');

// signup route for teacher
module.exports.create =  async function(req,res){
    console.log('we are at Sign up');
    if(req.body.password != req.body.confirm_password){
        console.log(req.body.password + " " + req.body.confirm_password);
        return res.redirect('back');
    }
    try {
        const teacher = await Teacher.findOne({email: req.body.email});
        if(teacher){
            console.log("User is already exist");
            return res.redirect("back");
        }else{
            const newTeacher = await Teacher.create(req.body);
            if(!newTeacher){
                console.log("error on creating new teacher");
                return res.redirect('back');
            }
            console.log("Teachers registraion successfully");
            return res.redirect('/teachers/login');
        }
        
    } catch (error) {
        console.log("error on catch ",error);
    }
 }

 
 // login route for the teacher
module.exports.createSession = async function (req,res){

    console.log("we are at sign in");
    try {
        const teacher = await Teacher.findOne({
        email: req.body.email,
        number : req.body.number
    });
    if(teacher){
        if(teacher.password != req.body.password && teacher.number != req.body.number ){
            console.log("password is not matching");
            return res.redirect('back');
        }
        res.cookie('teachers_id', teacher.id);
        
const teacherName = teacher.name;
const teacherEmail = teacher.email;
console.log("name", teacherName , teacherEmail);

        console.log('teacher_id: ',teacher.id);
        req.session.teacher = {
            id: teacher.id,
            name: teacher.name,
            email : teacher.email
            
            // Add other user details as needed
        };
        const   isTeacherAuthenticated = Boolean(req.session.teacher);

        console.log("you are logged in successfully");
        return res.redirect('/teachers/home');
    }else{
        return res.redirect('back');

    }
        
    } catch (error) {
        console.log("error on login",error);
    }
 }



 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 