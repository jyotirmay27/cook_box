const { validationResult } = require('express-validator');

const HttpError = require('../HttpError');
const User= require('../models/User');
const Upload= require('../models/Upload');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const Driver= require('../models/Driver');
const Doctor= require('../models/Doctor');
const Motivation= require('../models/Motivation');

const signup =async  (req, res, next) => {
    const errors = validationResult(req); // this will validate the checks we put on user router file for name email and password.
    if (!errors.isEmpty()) {
      throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const { name, email, password } = req.body; // will recieve json data from front to process further
    console.log(email);
    let existingUser;
    try {
      existingUser =await User.findOne({ email: email}) // find the email in database
        
    } catch (err) {
        const error = new HttpError('SigningUP failed',500);
          return next(error);
        
    }
    console.log(existingUser);
        if (existingUser) {
            const error = new HttpError('User already exist',422);
          return next(error);
            
        }
  
        let hashedPassword;
        try{
        hashedPassword = await bcrypt.hash(password,12); // hash the password to 12 digits
        }
        catch(err)
        {
          const error = new HttpError('could not create', 500);  
          return next(error);
        }
    const createdUser =new User ({ // create new user template to enter in database
  
      name, 
      email,
      password : hashedPassword,
      
    });
  console.log(hashedPassword);
    try {
      await createdUser.save(); // save the data in database by this line
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { userId: createdUser.id, email: createdUser.email }, // it will create a token storing email and user ID in it
        'supersecret_dont_share', // this is the key which is very specific and could lead to system hack
        { expiresIn: '1h' }// token will be expired in 1hr
      );
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    res.status(201).json({user: createdUser.toObject({ getters: true }),token: token}); // returns the object of created user and token
  };// getters: true will send response object ID as 'id' instead of '_id' which mongoDB created automatically
  const login =async  (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email: email }) // find the entry in database
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser ) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    let isValidPassword= false;
    try {
    isValidPassword= await bcrypt.compare(password,existingUser.password) // will conpare the password you entered and which is saved hashed in database.
    }
    catch(err)
    {
      const error = new HttpError(
        ' could not log you in.',
        401
      );
      return next(error);
  
    }
    let token;
    try {
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email }, // it will create a token using ur user ID and email.
        'supersecret_dont_share',// this is the key which is very specific and could lead to system hack
        { expiresIn: '1h' } // token will be expired in 1hr
      );
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    res.json({message: 'Logged in!',
    user: existingUser.toObject({getters: true}),
    token:token});// getters: true will send response object ID as 'id' instead of '_id' which mongoDB created automatically
  
  };



  const upload = async (req, res, next) => {
    //const errors = validationResult(req);
    //if (!errors.isEmpty()) {
    //  return next(
    //    new HttpError('Invalid inputs passed, please check your data.', 422)
    //  );
    //}
    //const usid= req.params.uid
    const { name, email, ing1,ing2,ing3,ing4 } = req.body;
    console.log(name);
    console.log(email);
    console.log("hell");
    // console.log(req.file.path);
    const createdUpload = new Upload({
        name,
         userid:email,
         image:req.file.path, 
         ing1,
         ing2,
         ing3,
         ing4
    });
  
    try {
      await createdUpload.save();
      console.log("ggg3");
    } catch (err) {
        
        console.log(err);

      const error = new HttpError(
        'uploading up failed, please try again.',
        500
      );
      return next(error);
    }
    console.log("gjhfbujdgg3");
    res.status(201).json({upload: createdUpload.toObject({ getters: true })});
  };

  const getAll = async(req,res,next) =>{
   // const userId=req.params.uid;  // this will bind the user Id from url to a constant
   let recipes;
   try {
     recipes = await Upload.find({});
   } catch (err) {
     const error = new HttpError(
       'Fetching users failed, please try again later.',
       500
     );
     return next(error);
   }
   //console.log(recipes);
   //console.log( typeof(recipes));

   res.json({ recipes: recipes.map(recipe => recipe.toObject({ getters: true })) });
 };
 const getAllDocs = async(req,res,next) =>{
    // const userId=req.params.uid;  // this will bind the user Id from url to a constant
    let recipes;
    try {
      recipes = await Doctor.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    console.log(recipes);
 
    res.json({ docs: recipes.map(recipe => recipe.toObject({ getters: true })) });
  };
  const getAllMotivation = async(req,res,next) =>{
    // const userId=req.params.uid;  // this will bind the user Id from url to a constant
    let recipes;
    try {
      recipes = await Motivation.find({});
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    console.log(recipes);
 
    res.json({ videos: recipes.map(recipe => recipe.toObject({ getters: true })) });
  };
 const getBySearch = async(req,res,next) =>{
    // const userId=req.params.uid;
      // this will bind the user Id from url to a constant
      var searchid=req.params.sid;
      const x=searchid.split(','); 
       const res1 = await Upload.find({ing1: {$in: x}});
       const res2 = await Upload.find({ing2: {$in: x}});
       const res3 = await Upload.find({ing3: {$in: x}});
       const res4 = await Upload.find({ing4: {$in: x}});
       let result = []
       if(res1.length>0)
         result = result.concat(res1);
       if(res2.length>0)
         result = result.concat(res2);
       if(res3.length>0)
         result = result.concat(res3);  
       if(res4.length>0)
         result = result.concat(res4);
       console.log(result);
       //res.status(200).json(result);
      
    res.json({ recipes: result.map(recipe => recipe.toObject({ getters: true })) });
  };// getters: true will send response object ID as 'id' instead of '_id' which mongoDB created automatically

  // this fetch the medicines for the particular user
  const getDriver = async(req, res, next) => {
    var x = "false";
    const drivers = await Driver.find({status: x});
    var info;
    console.log(drivers);
    // if(drivers.length == 0)
    //   res.json({info:{} });
    // else
      res.json({ info: drivers.map(driver => driver.toObject({ getters: true })) });
  };

  const createDriver = async (req, res, next) => {
    //const errors = validationResult(req); // this will validate the checks we put on user router file for name email and password.
    //if (!errors.isEmpty()) {
    //  throw new HttpError('Invalid inputs passed, please check your data.', 422);
    //}
    const { name, li } = req.body; // will recieve json data from front to process further
    console.log(li);
    //let existingUser;
    //try {
    //  existingUser =await Motivation.findOne({ email: email}) // find the email in database
        
    //} catch (err) {
    //    const error = new HttpError('SigningUP failed',500);
    //      return next(error);
        
    //}
    //console.log(existingUser);
    //    if (existingUser) {
    //        const error = new HttpError('User already exist',422);
    //      return next(error);
            
    //    }
  
    //    let hashedPassword;
    //    try{
    //    hashedPassword = await bcrypt.hash(password,12); // hash the password to 12 digits
    //    }
    //    catch(err)
    //    {
    //      const error = new HttpError('could not create', 500);  
    //      return next(error);
    //    }
    const createdUser =new Motivation ({ // create new user template to enter in database
  
      name, 
      li
    //  status:"false",
    //  order:""
    });
    try {
      await createdUser.save();
      console.log("bithc"); // save the data in database by this line
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
    //let token;
    //try {
    //  token = jwt.sign(
    //    { userId: createdUser.id, email: createdUser.email }, // it will create a token storing email and user ID in it
    //    'supersecret_dont_share', // this is the key which is very specific and could lead to system hack
    //    { expiresIn: '1h' }// token will be expired in 1hr
    //  );
    //} catch (err) {
    //  const error = new HttpError(
    //    'Signing up failed, please try again later.',
    //    500
    //  );
    //  return next(error);
    //}
    res.status(201).json({user: createdUser.toObject({ getters: true })}); // returns the object of created user and token
  };
  const cancelAnAppointment =async  (req, res, next) => {
    const { userID, docID } = req.body;
    
  
  
  //var patName = name;
  
  
  var transporter = nodemailer.createTransport({ // it will provide the mail id password from the the site has to send mails whenever required.
      service: 'gmail',
      auth: {
        user: 'codingstrings.js@gmail.com',
        pass: 'mfsjthupwqfvldut'
      }
    });
    let f;
    
    
    var mailOptions = { // this will set the content of the mail which the nodemailer will send.
      from: 'meditech.appointment@gmail.com',
      to: userID,
      subject: 'Confirmation of Appointment',
      html: `<p>Hello Patient,</p>
              <p>The doctor is busy on please choose som other day for the appointment.</p>
              <p>Regards Cook-Box</p>`
    };
    // var mailOptions2 = { // this will set the content of the mail which the nodemailer will send.
    //   from: 'meditech.appointment@gmail.com',
    //   to: userID,
    //   subject: 'Confirmation of Appointment',
    //   html: `<p>Hello Patient,</p>
    //           <p>The doctor  (${userID}) has booked an appointment with you for ${date} at (${time}).</p>
    //           <p>Regards MediTech</p>`
    // };
    console.log("jui");
    
    transporter.sendMail(mailOptions, function(error, info){ // it will trigger and a mail will be sent to the id provided by user 
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info);
      }
    });
    res.json({message: 'Mail Sent!'});
  };
  const bookAnAppointment =async  (req, res, next) => {
    const { date, time, userID, docID } = req.body;
    
  
  
  //var patName = name;
  
  console.log("book");
  var transporter = nodemailer.createTransport({ // it will provide the mail id password from the the site has to send mails whenever required.
      service: 'gmail',
      auth: {
        user: 'codingstrings.js@gmail.com',
        pass: 'mfsjthupwqfvldut'
      }
    });
    let f=userID+docID;
    
    
    var mailOptions = { // this will set the content of the mail which the nodemailer will send.
      from: 'meditech.appointment@gmail.com',
      to: docID,
      subject: 'Confirmation of Appointment',
      html: `<p>Hello,</p>
              <p>The client (${userID}) has  booked an appointment with you for ${date} at (${time}).</p>
              <p>Regards Cook-Box</p>`
    };
    var mailOptions2 = { // this will set the content of the mail which the nodemailer will send.
      from: 'meditech.appointment@gmail.com',
      to: userID,
      subject: 'Confirmation of Appointment',
      html: `<p>Hello Patient,</p>
              <p>The  (${docID}) has booked an appointment with you for ${date} at (${time}).</p>
              <p>Regards Cook-Box</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){ // it will trigger and a mail will be sent to the id provided by user 
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    transporter.sendMail(mailOptions2, function(error, info){ // it will trigger and a mail will be sent to the id provided by user 
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({message: 'Mail Sent!'});
  };

  const Appointment =async  (req, res, next) => {
    const { date, name, patEmail, docEmail } = req.body;
    
  
  
  var patName = name;
  
  console.log(docEmail);
  var transporter = nodemailer.createTransport({ // it will provide the mail id password from the the site has to send mails whenever required.
      service: 'gmail',
      auth: {
        user: 'codingstrings.js@gmail.com',
        pass: 'mfsjthupwqfvldut'
      }
    });
    let f;
    
    
    var mailOptions = { // this will set the content of the mail which the nodemailer will send.
      from: 'codingstrings.js@gmail.com',
      to: docEmail,
      subject: 'Book an appointment',
      html: `<p>Hello Doctor,</p>
              <p>The patient ${patName} (${patEmail}) wants to book an appointment with you for ${date}.</p>
              <a href= 'http://localhost:3000/confirmappointment/${patEmail}/${docEmail}'> click to confirm and add the time  </a>
              <a href= "http://localhost:3000/denyappointment"> click to deny we'll send a mail to choose another date to the user  </a>
              <p>Regards Cook-Box</p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){ // it will trigger and a mail will be sent to the id provided by user 
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({message: 'Mail Sent!'});
  };
  const rateRecipe = async (req, res, next) => {
    const x = req.params.id;
    console.log("hi")
    console.log(req.body.x);
    const y = req.body.x;
    const recipe = await Upload.findById(x);
    recipe.rate.push(y);
    // const recipe = await Upload.updateMany(
    //   {_id: x},
    //   {$push: {rate: x}},
    //   )
    console.log(recipe.rate);
    recipe.save();
    res.status(200).json("rating updated");
  };
  exports.rateRecipe = rateRecipe;
  exports.signup = signup;
  exports.login = login;
  exports.upload = upload;
  exports.getAll = getAll;
  exports.getBySearch = getBySearch;
  exports.getDriver = getDriver;
  exports.createDriver = createDriver;
  exports.cancelAnAppointment=cancelAnAppointment;
  exports.bookAnAppointment=bookAnAppointment;
  exports.getAllDocs=getAllDocs;
  exports.Appointment=Appointment;
  exports.getAllMotivation=getAllMotivation;