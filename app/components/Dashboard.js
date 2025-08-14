"use client";

import React, { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
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
      router.push("/login");
      return;
    }
    if (session?.user?.name) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getData = async () => {
    try {
      const u = await fetchUser(session.user.name);
      if (u) {
        setFormData((prev) => ({ ...prev, ...u }));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.name) return;

    try {
      await updateProfile(formData, session.user.name);
      await update();
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
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="profilepic"
            placeholder="Profile Picture"
            value={formData.profilepic || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="razorpayId"
            placeholder="Razorpay ID"
            value={formData.razorpayId || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

          <input
            type="text"
            name="razorpaySecret"
            placeholder="Razorpay Secret"
            value={formData.razorpaySecret || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-sky-950 focus:outline-none"
          />

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
