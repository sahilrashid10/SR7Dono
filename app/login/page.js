"use client";
import React, {useEffect} from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
const Login = () => {
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <div className='text-white py-14 container mx-auto'>
      <h1 className='text-center font-bold text-3xl'>Login to Get Started</h1>

      <div className="flex flex-col gap-4 min-h-screen items-center p-10">

        {/* Google Button */}
        <button className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn Button */}
        <button className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
          <span>Continue with LinkedIn</span>
        </button>

        {/* Twitter Button */}
        <button className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="/x.svg" alt="Twitter" className="w-5 h-5" />
          <span>Continue with X</span>
        </button>

        {/* Facebook Button – FIXED */}
        <button className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" className="w-5 h-5" />
          <span>Continue with Facebook</span>
        </button>

        {/* GitHub Button – FIXED */}
        <button onClick={() => signIn("github")} className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" />
          <span>Continue with GitHub</span>
        </button>

        {/* Apple Button – FIXED */}
        <button className="flex items-center gap-2 w-64 bg-white text-black border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5" />
          <span>Continue with Apple</span>
        </button>

      </div>
    </div>
  );
};

export default Login;
