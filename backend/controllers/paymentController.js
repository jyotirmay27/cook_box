
const crypto=require('crypto');
const Payment=require('../models/paymentModel');
const Razorpay = require('razorpay');
const instance = new Razorpay({
    key_id:"rzp_test_WNxHRjLcpl7VjP",
    key_secret: "B0JG14StCRjX9K0q3fWbXxC9",
  });
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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
console.log(req.body);
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "B0JG14StCRjX9K0q3fWbXxC9")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log(expectedSignature);
  if (isAuthentic) {
    // Database comes here
    try {
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });
      
      } catch (err) {
          
          console.log(err);
  
        const error = new HttpError(
          'uploading up failed, please try again.',
          500
        );
      }
   


    res.redirect(
      `http://localhost:3000/home`
    );
  } else {
    res.redirect(
        `http://localhost:3000/home`
      );
    res.status(400).json({
      success: false,
    });
  }
};
exports.checkout = checkout;
exports.paymentVerification = paymentVerification;
exports.getkey = getkey;