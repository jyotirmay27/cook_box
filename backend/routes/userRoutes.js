const express = require('express');
// express-validator will info entered is coorect like if email is an email or not like that
const  {check} = require('express-validator')
const fileUpload = require('../middleware/file-upload');


const usersControllers = require('../controllers/userController');


const router = express.Router();
router.get('/all',usersControllers.getAll);
router.get('/search/:sid',usersControllers.getBySearch);
router.post('/signupDriver', usersControllers.createDriver)

router.get('/getDriver', usersControllers.getDriver);
// when a user enters his/her credentials this router will send the request to POST to user controller
router.post('/signup',usersControllers.signup);
router.post('/bookanappointment', usersControllers.bookAnAppointment);
router.post('/cancelanappointment', usersControllers.cancelAnAppointment);


// when a user enters his/her credentials this router will send the request to user controller to verify if its correct
router.post('/login', usersControllers.login);

router.post('/upload',
fileUpload.single('image'),
 usersControllers.upload);



module.exports  = router;