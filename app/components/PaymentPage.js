"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import { initiate, fetchUser, fetchPayments } from "@/actions/useractions";
import { useSession } from "next-auth/react";

const PaymentPage = ({ username }) => {
  const { data: session, status } = useSession();
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") getData();
    const urlParams = new URLSearchParams(window.location.search);
    setShowPaymentSuccess(urlParams.get("paymentdone") === "true");
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentform((prev) => ({ ...prev, [name]: value ?? "" }));
  };

  const getData = async () => {
    setLoading(true);
    try {
      const u = await fetchUser(username);
      setCurrentUser(u);
      const dbPayment = await fetchPayments(username);
      setPayments(dbPayment);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const pay = async (amount) => {
    setLoading(true);
    try {
      const orderData = await initiate(amount, username, paymentform);
      if (!orderData?.id) throw new Error("Order creation failed");

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: "INR",
        name: "SR7Dono",
        order_id: orderData.id,
        prefill: { name: paymentform.name || "" },
        theme: { color: "#3399cc" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/razorpay", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const data = await verifyRes.json();
            if (data.success) {
              setShowPaymentSuccess(true);
              setTimeout(() => setShowPaymentSuccess(false), 5000);
              window.history.replaceState(null, "", "?paymentdone=true");
              getData();
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            alert("Verification failed: " + err.message);
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFormPayment = () => {
    const amountNum = Number(paymentform.amount);
    if (!amountNum || amountNum <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!paymentform.name.trim()) {
      alert("Please enter your name");
      return;
    }
    pay(amountNum * 100); // Razorpay expects paise
  };

  if (status === "loading") return <p className="text-center mt-8">Loading session...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-8">Please login to view this page.</p>;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="min-h-screen bg-sky-800 text-white p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {showPaymentSuccess && (
            <div className="mb-6 p-4 bg-green-600 rounded-lg text-center">
              <h3 className="font-bold text-lg">Payment Successful!</h3>
              <p>Thank you for your donation ❤️</p>
            </div>
          )}

          {loading && <p className="text-center mb-4">Loading data...</p>}

          <div className="flex justify-center mb-6">
            <Image
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 border-white object-cover"
              src={currentUser?.profilepic || "/default-avatar.png"}
              alt="Profile"
              width={160}
              height={160}
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold break-words">@{username}</h1>
            <p className="text-gray-300 mt-1 text-sm sm:text-base">Creating Animated art for VTTs</p>
            <p className="text-xs sm:text-sm mt-1">
              {payments.length} supporters • ₹
              {payments.reduce((acc, p) => acc + p.amount / 100, 0)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supporters */}
            <div className="bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md max-h-[400px] overflow-y-auto">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Supporters ({payments.length})</h2>
              {payments.length > 0 ? (
                <ul>
                  {payments
                    .filter((p) => p.done)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((donor, index) => (
                      <li key={donor._id || index} className="mb-3 p-2 bg-gray-600 rounded break-words">
                        <div className="flex items-start">
                          <span className="mr-2">👤</span>
                          <div className="flex-1">
                            <p className="text-sm sm:text-base">
                              <strong>{donor.name}</strong> donated{" "}
                              <strong className="text-green-400">₹{(donor.amount / 100).toFixed(0)}</strong>
                            </p>
                            {donor.message && (
                              <p className="text-xs text-gray-300 mt-1 italic break-words">&quot;{donor.message}&quot;</p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">{new Date(donor.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-6">No donations yet. Be the first to support!</p>
              )}
            </div>

            {/* Payment Form */}
            <div className="bg-gray-700 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">Make a Donation</h2>
              <div className="space-y-4">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Your Name *"
                  onChange={handleChange}
                  value={paymentform.name}
                  className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-500 outline-none"
                  required
                  disabled={loading}
                />
                <textarea
                  name="message"
                  placeholder="Enter Message (Optional)"
                  onChange={handleChange}
                  value={paymentform.message}
                  rows="3"
                  className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-500 outline-none resize-none"
                  disabled={loading}
                />
                <input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="Enter Amount (₹) *"
                  onChange={handleChange}
                  value={paymentform.amount}
                  className="w-full p-2 rounded bg-sky-950 text-white placeholder-gray-400 border border-gray-600 focus:border-orange-500 outline-none"
                  required
                  disabled={loading}
                />
                <button
                  onClick={handleFormPayment}
                  disabled={!paymentform.amount || !paymentform.name.trim() || loading}
                  className="w-full bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl text-white py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Donate ₹{paymentform.amount || "0"}
                </button>

                <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                  {[1000, 2000, 3000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        if (!paymentform.name.trim()) {
                          alert("Please enter your name first");
                          return;
                        }
                        pay(preset);
                      }}
                      className="flex-1 bg-orange-500 py-2 rounded hover:bg-orange-600 transition font-semibold"
                      disabled={loading}
                    >
                      ₹{preset / 100}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Quick donate buttons require your name to be filled first.
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

export const metadata = { title: "PaymentPage | SR7Dono" };
