import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import connectDB from "@/db/connectDb";
import Payment from "@/app/models/Payment";

export const POST = async (req) => {
  try {
    console.log("VERIFY ROUTE HIT", new Date().toISOString());
    await connectDB();

    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let body;
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd);
    }
    console.log("verify body:", body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing required payment fields" },
        { status: 400 }
      );
    }

    const p = await Payment.findOne({ oid: razorpay_order_id });
    if (!p) {
      return NextResponse.json(
        { success: false, message: "Order ID not found" },
        { status: 404 }
      );
    }

    const secret = process.env.KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const attributes = { order_id: razorpay_order_id, payment_id: razorpay_payment_id };
    const isValid = validatePaymentVerification(attributes, razorpay_signature, secret);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    p.done = true;
    await p.save();

    const redirectUrl = `${process.env.NEXT_PUBLIC_URL || "https://sr-7-dono.vercel.app/"}/${p.to_user}?paymentdone=true`;
    return NextResponse.json({ success: true, redirectUrl }, { status: 200 });

  } catch (err) {
    console.error("Verify route error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error", detail: err?.message },
      { status: 500 }
    );
  }
};
