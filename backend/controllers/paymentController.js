
const crypto=require('crypto');
const Payment=require('../models/paymentModel');
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id:"rzp_test_WNxHRjLcpl7VjP",
    key_secret: "B0JG14StCRjX9K0q3fWbXxC9",
  });
  const Driver= require('../models/Driver');
  const nodemailer = require("nodemailer");

const getkey =  (req, res) => {

    console.log("jo");
    res.status(200).json({
        key: "rzp_test_WNxHRjLcpl7VjP" 
      });
};
 const checkout = async (req, res) => {
    const { amount } = req.body;

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  console.log(options);
  const order = await instance.orders.create(options);
  console.log(order);
  //const orders=JSON.stringify(order);
  //console.log(orders);
  res.status(200).json({order });
};


 const paymentVerification = async (req, res) => {

    var x = "false";
    const drivers = await Driver.find({status: x});
    var info;
    console.log(drivers);
    // if(drivers.length == 0)
    //   res.json({info:{} });
    // else
     info=drivers[0];
    const usid= req.params.uid

var patEmail = usid;
var driverEmail = info.email;


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
    to: driverEmail,
    subject: 'Book an appointment',
    html: `<p>Hello Doctor,</p>
            <p>The patient (${patEmail}) wants to book an appointment with you for.</p>
            <a href= 'http://localhost:3000/confirmappointment/${patEmail}/${driverEmail}'> click to confirm and add the time  </a>
            <p>Regards CookBox</p>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){ // it will trigger and a mail will be sent to the id provided by user 
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info);
    }
  });
//  res.json({message: 'Mail Sent!'});
   


    res.redirect(
      `http://localhost:3000/home`
    );
};
exports.checkout = checkout;
exports.paymentVerification = paymentVerification;
exports.getkey = getkey;