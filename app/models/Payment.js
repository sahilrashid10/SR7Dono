// app/models/payment.js
import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  to_user: { type: String, required: true },
  oid: { type: String, required: true },           // razorpay order id
  message: { type: String, default: "" },
  amount: { type: Number, required: true },        // paise
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
