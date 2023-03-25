const express = require('express');

const paymentControllers = require('../controllers/paymentController');

const router = express.Router();

router.post("/checkout",paymentControllers.checkout);

router.post("/paymentverification/:uid",paymentControllers.paymentVerification);

router.get("/getkey",paymentControllers.getkey);
module.exports  = router;