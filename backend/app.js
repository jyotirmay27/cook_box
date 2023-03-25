const fs = require('fs');
const path = require('path');
const express = require('express');
const Razorpay = require('Razorpay');

const HttpError = require('./HttpError');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const mongoose = require('mongoose');
const paymentRoute = require('./routes/paymentRoutes');
const cors=  require('cors');


//config({ path: "./config/config.env" });

const app = express();
app.use(cors());

// bodyparser is used to parse the body to make connection smoother
app.use(bodyParser.json());

// headers ar set to make transfer of JSON data from frontend to backend even in different ports like 3000 and 5000
app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PATCH');
    next();
});
app.use('/uploads/images', express.static(path.join('uploads', 'images')));


app.use('/api/users',userRoutes);


//app.get("/api/getkey", paymentRoute
////(req, res) =>
////  res.status(200).json({ 
////    key: "rzp_test_WNxHRjLcpl7VjP" 
////}
////)
//);
app.use("/api/payment", paymentRoute);
app.use((req,res,next)=>{ 
    const error = new HttpError('Could not find this shit' , 404);
    throw error;

}
);
app.use((error,req,res,next)=> {
    if (req.file) {
        fs.unlink(req.file.path, err => {
          console.log(err);
        });
      }
    if(res.headerSent)
    {
        return next(error);
    }

    res.status(error.code || 500)
    res.json({message: error.message || 'unknown error'})

});


//app.listen(5000);
mongoose
.connect('mongodb+srv://jyotirmay27:helloworld@cluster0.0qr9c.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log("connection established");
    app.listen(5000);
})
.catch(err => {
console.log(err);
});
//mongodb+srv://jyotirmay27:<password>@cluster0.0qr9c.mongodb.net/?retryWrites=true&w=majority