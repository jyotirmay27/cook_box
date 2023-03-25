const { validationResult } = require('express-validator');

const HttpError = require('../HttpError');
const User= require('../models/User');
const Upload= require('../models/Upload');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

//const signup = async (req, res, next) => {
//    const errors = validationResult(req);
//    if (!errors.isEmpty()) {
//      return next(
//        new HttpError('Invalid inputs passed, please check your data.', 422)
//      );
//    }
//    const { name, email, password } = req.body;
//    console.log(name);
//    console.log(email);
//    console.log("hell");
//    let existingUser
//    try {
//      existingUser = await User.findOne({ email: email })
//    } catch (err) {
        
//      const error = new HttpError(
//        'Signing up failed, please try again later.',
//        500
//      );
//      return next(error);
//    }
//    if (existingUser) {
//      const error = new HttpError(
//        'User exists already, please login instead.',
//        422
//      );
//      return next(error);
//    }
    
//    const createdUser = new User({
//      name,
//      email,
//      password
//    });
  
//    try {
//      await createdUser.save();
//    } catch (err) {
//        console.log("ggg3");
//        console.log(err);

//      const error = new HttpError(
//        'Signing up failed, please try again.',
//        500
//      );
//      return next(error);
//    }
  
//    res.status(201).json({user: createdUser.toObject({ getters: true })});
//  };
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
  
    // this fetch the Prescriptions for the particular user
  };
//  const login = async (req, res, next) => {
//    const { email, password } = req.body;
//  console.log(email);
//  console.log(password);
//    let existingUser;
  
//    try {
//      existingUser = await User.findOne({ email: email })
//    } catch (err) {
//      const error = new HttpError(
//        'Logging in failed, please try again later.',
//        500
//      );
//      return next(error);
//    }
  
//    if (!existingUser || existingUser.password !== password) {
//      const error = new HttpError(
//        'Invalid credentials, could not log you in.',
//        401
//      );
//      return next(error);
//    }
//    console
//    res.json({message: 'Logged in!'});
//  };


  const upload = async (req, res, next) => {
    //const errors = validationResult(req);
    //if (!errors.isEmpty()) {
    //  return next(
    //    new HttpError('Invalid inputs passed, please check your data.', 422)
    //  );
    //}
    const { name, email, ing1,ing2,ing3,ing4 } = req.body;
    console.log(name);
    console.log(email);
    console.log("hell");
    //let existingUser
    //try {
    //  existingUser = await User.findOne({ email: email })
    //} catch (err) {
        
    //  const error = new HttpError(
    //    'Signing up failed, please try again later.',
    //    500
    //  );
    //  return next(error);
    //}
    //if (existingUser) {
    //  const error = new HttpError(
    //    'User exists already, please login instead.',
    //    422
    //  );
    //  return next(error);
    //}
    
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
 const getBySearch = async(req,res,next) =>{
    // const userId=req.params.uid;
      // this will bind the user Id from url to a constant
     var searchid=req.params.sid;
      const x=searchid.split(',');
      //console.log(x.size());
      console.log(x);
      console.log("jiill");
      //const allrecipes=[];
      let allrecipes;
    try {
        const results= await Promise.all(x.map( async element => {
            let newArr = await Upload.find({ing1:element})
            console.log(newArr.length);
            return newArr;
        }));
        console.log(results[0]);
        //allrecipes.pushValues(results[0]);
        console.log("lo");
        const results2= await Promise.all(x.map( async element => {
            let newArr = await Upload.find({ing2:element})
            console.log(newArr.length);
            return newArr;
        }));
        console.log(results2[1]);
         allrecipes = results[0].concat(results2[1]);
        //allrecipes.pushValues(results2[0]);
        console.log("all");
        console.log(allrecipes);  
       console.log( typeof(allrecipes));
    } catch (err) {
      const error = new HttpError(
        'Fetching users failed, please try again later.',
        500
      );
      return next(error);
    }
    if(allrecipes == undefined) {
        res.json({recipes:{} });
      }
      else
    res.json({ recipes: allrecipes.map(recipe => recipe.toObject({ getters: true })) });
  };// getters: true will send response object ID as 'id' instead of '_id' which mongoDB created automatically

  // this fetch the medicines for the particular user
 
  exports.signup = signup;
  exports.login = login;
  exports.upload = upload;
  exports.getAll = getAll;
  exports.getBySearch = getBySearch;

//  const login =async  (req, res, next) => {
//    const { email, password } = req.body;
//    console.log(email);
//    let existingUser;
  
//    try {
//      existingUser = await User.findOne({ email: email }) // find the entry in database
//    } catch (err) {
//      const error = new HttpError(
//        'Logging in failed, please try again later.',
//        500
//      );
//      return next(error);
//    }
  
//    if (!existingUser ) {
//      const error = new HttpError(
//        'Invalid credentials, could not log you in.',
//        401
//      );
//      return next(error);
//    }
  
//    let isValidPassword= false;
//    try {
//    isValidPassword= await bcrypt.compare(password,existingUser.password) // will conpare the password you entered and which is saved hashed in database.
//    }
//    catch(err)
//    {
//      const error = new HttpError(
//        ' could not log you in.',
//        401
//      );
//      return next(error);
  
//    }
//    let token;
//    try {
//      token = jwt.sign(
//        { userId: existingUser.id, email: existingUser.email }, // it will create a token using ur user ID and email.
//        'supersecret_dont_share',// this is the key which is very specific and could lead to system hack
//        { expiresIn: '1h' } // token will be expired in 1hr
//      );
//    } catch (err) {
//      const error = new HttpError(
//        'Logging in failed, please try again later.',
//        500
//      );
//      return next(error);
//    }
  
//    res.json({message: 'Logged in!',
//    user: existingUser.toObject({getters: true}),
//    token:token});// getters: true will send response object ID as 'id' instead of '_id' which mongoDB created automatically
  
//    // this fetch the Prescriptions for the particular user
//  };