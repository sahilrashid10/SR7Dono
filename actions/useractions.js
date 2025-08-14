"use server"
import Razorpay from "razorpay"
import connectDB from "@/db/connectDb"
import User from "@/app/models/User"
import Payment from "@/app/models/Payment"
 

export const initiate = async (amount, to_username, Paymentform) => {
    try {
        console.log('=== SERVER ACTION START ===');
        console.log('Received params:', { amount, to_username, Paymentform });

        await connectDB();

        // FIX: Proper env variable check
        if (!process.env.KEY_ID || !process.env.KEY_SECRET) {
            console.error('Missing Razorpay credentials');
            throw new Error('Razorpay credentials not found in environment variables');
        }

        // Validate inputs
        if (!amount || amount <= 0) {
            throw new Error('Invalid amount provided');
        }
        if (!to_username) {
            throw new Error('Username is required');
        }

        console.log('Creating Razorpay instance...');
        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        let options = {
            amount: Number.parseInt(amount), // Amount in paise
            currency: "INR",
        };

        console.log('Creating Razorpay order with options:', options);
        let orderResponse = await instance.orders.create(options);
        console.log('Razorpay order created:', orderResponse);

        // Save Payment record to database
        console.log('Saving Payment record to database...');
        await Payment.create({
            oid: orderResponse.id,
            amount: amount,
            to_user: to_username,
            name: Paymentform?.name || 'Anonymous',
            message: Paymentform?.message || '',
            done: false // pending initially
        });
        console.log('Payment record saved successfully');

        const result = {
            id: orderResponse.id,
            entity: orderResponse.entity,
            amount: orderResponse.amount,
            currency: orderResponse.currency,
            status: orderResponse.status,
            created_at: orderResponse.created_at,
            key_id: process.env.KEY_ID
        };

        console.log('Returning result:', result);
        console.log('=== SERVER ACTION END ===');
        return result;

    } catch (error) {
        console.error('=== SERVER ACTION ERROR ===');
        console.error('Error details:', error);
        console.error('Error message:', error.message);
        throw new Error(`Failed to initiate Payment: ${error.message}`);
    }
};


export const fetchUser = async (username) => {
    await connectDB();
    const u = await User.findOne({ username }).lean();
    if (!u) return null;

    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString(),
        updatedAt: u.updatedAt?.toISOString(),
    };
};

export const fetchPayments = async (username) => {
    await connectDB();
    const p = await Payment.find({ to_user: username, done: true }) // ✅ only successful
        .sort({ amount: -1 })
        .lean();

    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt?.toISOString(),
        updatedAt: payment.updatedAt?.toISOString(),
    }));
};


export const updateProfile = async (data, oldusername) => {
   await connectDB();
   
   let ndata;
   if (data instanceof FormData) {
       ndata = Object.fromEntries(data);
   } else {
       ndata = data;
   }
   
   if (oldusername !== ndata.username) {
       let u = await User.findOne({ username: ndata.username });
       if (u) {
           return { error: "Username already exists" };
       }
   }
   
   // Force these fields to be set even if empty
   await User.updateOne({ email: ndata.email }, {
       ...ndata,
       razorpayId: ndata.razorpayId || "",
       razorpaySecret: ndata.razorpaySecret || "",
       updatedAt: new Date()
   });
};