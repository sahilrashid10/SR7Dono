"use client";

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/actions/useractions";

export default function Dashboard() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  useEffect(() => {
    if (!session) {
      // Redirect if not logged in
      router.push("/login");
      return;
    }

    // Fetch user data only if session exists
    getData();
  }, [router, session]);

  const getData = async () => {
    if (!session || !session.user) return; // ✅ Guard against undefined
    try {
      let u = await fetchUser(session.user.name);
      setFormData(u); // ✅ Correct state setter
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    if (!session || !session.user) return;

    try {
      await update();
      await updateProfile(formData, session.user.name);
      alert("Profile updated");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
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
            value={formData?.name || ""} // ✅ Default to empty string
            onChange={(e)=>handleChange(e)}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""} // ✅ Default
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username || ""} // ✅ Default
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="profilepic"
            placeholder="Profile Picture"
            value={formData.profilepic || ""} // ✅ Default
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          {/* <input
            type="text"
            name="coverpic"
            placeholder="Cover Picture"
            value={formData.coverpic || ""} // ✅ Default
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          /> */}

          <input
            type="text"
            name="razorpayId"
            placeholder="Razorpay id"
            value={formData.razorpayId || ""} // ✅ Default
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="razorpaySecret"
            placeholder="Razorpay Secret"
            value={formData.razorpaySecret || ""} // ✅ Default
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
