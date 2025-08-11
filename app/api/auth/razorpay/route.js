import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDb";

export const POST = async(req, res)=>{

    await connectDB();
     
    
    let body = await req.formData();

    if(!body){
        console.log("error: We are stupid");
    }
    console.log("The BODY: ",body);
    body = Object.fromEntries(body);
    
    // Check if razor pay order id is present on the server or not
    const p = await Payment.findOne({oid: body.razorpay_order_id});
    console.log("Find Payment",p);
    
    if (!p) {
        return NextResponse.json({success:false, message:"Order ID not found"});
    }

    // Verify the payment
    const isValid = validatePaymentVerification({"order_id":body.razorpay_order_id, "razorpay_payment":body.razorpay_payment_id}, body.razorpay_signature, process.env.NEXT_PUBLIC_KEY_SECRET);
    console.log("Message isPaymentValid ",isValid);
    
    if (isValid) {
        // update the payment status
        const updatePayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: true}, {new: true});
        console.log(`beign updated:${updatePayment}`)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatePayment.to_user}?paymentdone=true`);
    } else {
        return NextResponse.json({success:false, message:"payment verification failed"});
    }
}