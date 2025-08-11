"use server"
import Razorpay from "razorpay"
import connectDB from "@/db/connectDb"
import User from "@/app/models/User"
import Payment from "@/app/models/Payment"
import { POST } from "@/app/api/auth/[...nextauth]/route"

export const initiate = async(amount, to_username, Paymentform) => {
    try {
        console.log('=== SERVER ACTION START ===');
        console.log('Received params:', { amount, to_username, Paymentform });
        
        await connectDB();
        
        // FIXED: Use proper environment variables (without NEXT_PUBLIC_)
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
        var instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });
        
        let options = {
            amount: Number.parseInt(amount), // Amount in paise
            currency: "INR",
        }
        
        console.log('Creating Razorpay order with options:', options);
        let orderResponse = await instance.orders.create(options);
        console.log('Razorpay order created:', orderResponse);
        
        // FIXED: Save Payment record to database
        console.log('Saving Payment record to database...');
        await Payment.create({ 
            oid: orderResponse.id, 
            amount: amount, 
            to_user: to_username, 
            name: Paymentform.name || 'Anonymous', 
            message: Paymentform.message || '',
            done: false // Mark as pending initially
        });
        console.log('Payment record saved successfully');
        
        // Return order details with key_id for frontend
        const result = {
            id: orderResponse.id,
            entity: orderResponse.entity,
            amount: orderResponse.amount,
            currency: orderResponse.currency,
            status: orderResponse.status,
            created_at: orderResponse.created_at,
            key_id: process.env.KEY_ID // Send public key to frontend
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
}