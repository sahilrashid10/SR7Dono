"use client"
import React, { useState } from 'react';
import Script from 'next/script';
import { initiate } from '@/actions/useractions';
import { useSession } from 'next-auth/react';

const PaymentPage = ({ username }) => {
    const session = useSession();

    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: "",
    })

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const donations = [
        {
            name: "Shubham",
            amount: 50,
            message: "Keep up the great work!"
        }
    ];

    const pay = async (amount) => {
        try {
            console.log('Starting payment process for amount:', amount);
            
            // Get order id from backend
            let orderData = await initiate(amount, username, paymentform);
            console.log('Order data received:', orderData);
            
            if (!orderData || !orderData.id) {
                throw new Error('Failed to create order - no order ID received');
            }
            
            // FIXED: Use the actual order ID, not the key_id
            // const orderId = orderData.id;
        
            
            var options = {
                "key": orderData.key_id, // Razorpay public key
                "amount": amount, // Amount in paise
                "currency": "INR",
                "name": "SR7Dono1",
                "description": "Donation app for content creators.",
                "image": "https://example.com/your_logo",
                "order_id": orderData.id, // FIXED: Actual order ID from Razorpay
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                "prefill": {
                    "name": paymentform.name || "Anonymous",
                    "email": session?.data?.user?.email || "user@example.com",
                    "contact": "+919876543219"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                },
                "handler": function (response) {
                    console.log('Payment successful:', response);
                    alert('Payment successful! Redirecting...');
                    // Razorpay will automatically redirect to callback_url
                },
                "modal": {
                    "ondismiss": function() {
                        console.log('Payment cancelled by user');
                        alert('Payment was cancelled');
                    }
                }
            };

            console.log('Opening Razorpay with options:', options);
            
            if (!window.Razorpay) {
                throw new Error('Razorpay script not loaded. Please refresh the page.');
            }
            
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            
        } catch (error) {
            console.error('Payment error:', error);
            alert(`Payment failed: ${error.message}`);
        }
    }

    const handleFormPayment = () => {
        if (!paymentform.amount || paymentform.amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        // Convert rupees to paise (multiply by 100)
        pay(paymentform.amount * 100);
    }

    return (
        <>
            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js"
                onLoad={() => console.log('Razorpay script loaded successfully')}
                onError={(e) => {
                    console.error('Failed to load Razorpay script:', e);
                    alert('Failed to load payment system. Please refresh the page.');
                }}
            />

            <div className="min-h-screen bg-sky-800 text-white p-4">
                <div className="max-w-4xl mx-auto">

                    {/* Profile */}
                    <div className="flex justify-center mb-6">
                        <img
                            className="w-40 h-40 rounded-full border-4 border-white object-cover"
                            src="https://avatars.githubusercontent.com/u/55706303?v=4"
                            alt="Profile"
                        />
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold">@{username}</h1>
                        <p className="text-gray-300 mt-2">Creating Animated art for VTTs</p>
                        <p className="text-sm mt-1">9,719 members · 82 posts · $15,450/release</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Supporters */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Supporters</h2>
                            <ul>
                                {donations.map((donor, index) => (
                                    <li key={index} className="mb-3">
                                        <div className="flex items-start">
                                            <span className="mr-2">👤</span>
                                            <p className="text-sm">
                                                <strong>{donor.name}</strong> donated <strong>₹{donor.amount}</strong> — "{donor.message}"
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Payment Form */}
                        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
                            <div className="space-y-4">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={(e) => handleChange(e)}
                                    value={paymentform.name}
                                    className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400"
                                />
                                <input
                                    name="message"
                                    type="text"
                                    placeholder="Enter Message"
                                    onChange={(e) => handleChange(e)}
                                    value={paymentform.message}
                                    className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400"
                                />
                                <input
                                    name="amount"
                                    type="number"
                                    placeholder="Enter Amount (₹)"
                                    onChange={(e) => handleChange(e)}
                                    value={paymentform.amount}
                                    className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400"
                                />
                                <button
                                    onClick={handleFormPayment}
                                    disabled={!paymentform.amount}
                                    className="w-full bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl text-white py-2 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Pay ₹{paymentform.amount || '0'}
                                </button>
                                <div className="flex justify-between gap-2 mt-2">
                                    {[1000, 2000, 3000].map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => pay(preset)}
                                            className="flex-1 bg-orange-500 py-2 rounded hover:bg-orange-600 transition"
                                        >
                                            ₹{preset / 100}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 text-center">
                                    Preset buttons are in paise. Form input is in rupees.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;