"use client";

import { useState } from "react";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profilePicture: "",
    coverPicture: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // You can send this to your API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-800 text-white">
      <div className="w-full max-w-lg px-6 py-8 bg-transparent">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to your Dashboard
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Profile Picture */}
          <input
            type="text"
            name="profilePicture"
            placeholder="Profile Picture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Cover Picture */}
          <input
            type="text"
            name="coverPicture"
            placeholder="Cover Picture"
            value={formData.coverPicture}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Razorpay ID */}
          <input
            type="text"
            name="razorpayId"
            placeholder="Razorpay id"
            value={formData.razorpayId}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Razorpay Secret */}
          <input
            type="text"
            name="razorpaySecret"
            placeholder="Razorpay Secret"
            value={formData.razorpaySecret}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* Save Button */}
          <button
            type="submit"
            className="w-full text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 py-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
