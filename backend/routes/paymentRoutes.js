import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from '../models/orderModel.js';


const router = Router();
const instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});



  

router.post("/orders", async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = req.body.orderId;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }

      res.status(200).json({ data: { ...order, amount: amount }, orderId });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});


router.post("/verify", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      const paymentDateTime = new Date().toISOString();
      const order = await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = paymentDateTime;
        order.paymentResult = {
          id: razorpay_payment_id,
          status: 'COMPLETED', 
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          signature: razorpay_signature,
          update_time: paymentDateTime,
          email_address: req.body.email,
          amount: order.totalPrice, 
          currency: 'INR', 
          paymentDateTime: paymentDateTime,
        };

        const updatedOrder = await order.save();
        res.status(200).json({
            message: `Payment verified successfully`,
            paymentDateTime: paymentDateTime,
            updatedOrder,
          });
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
});

export default router;
