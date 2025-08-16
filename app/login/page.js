"use client";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const providers = [
    {
      name: "Google",
      icon: "https://www.svgrepo.com/show/475656/google-color.svg",
      action: () => signIn("google"),
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      action: () => signIn("github"),
    }
  ];

  return (
    <div className="text-white py-14 container mx-auto">
      <h1 className="text-center font-bold text-2xl sm:text-3xl">
        Login to Get Started
      </h1>

      <div className="flex flex-col gap-4 items-center p-5 sm:p-10">
        {providers.map((provider) => (
          <button
            key={provider.name}
            onClick={provider.action || undefined}
            className="flex items-center gap-2 w-full sm:w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-4 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <img src={provider.icon} alt={provider.name} className="w-5 h-5" />
            <span>Continue with {provider.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
