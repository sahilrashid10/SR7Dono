"use client";
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { data: session } = useSession();
    const [showdropdown, setshowdropdown] = useState(false);
    const router = useRouter();

    const handleNav = async(path) => {
        setTimeout(() => {
            setshowdropdown(false);
        }, 100);
        router.push(path);
    };

    return (
        <nav className="bg-sky-950 text-white flex justify-between items-center px-4 h-16 shadow-lg shadow-black/20">
            {/* Logo */}
            <Link className="logo font-bold text-lg flex items-center" href="/">
                <img className="invertIMG posto" src="/robot.gif" width={50} alt="Logo" />
                <span className="text-2xl ml-2">
                    SR7
                    <span className="text-xl md:text-base text-orange-600 ml-1">DONO</span>
                </span>
            </Link>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {session && (
                    <div className="relative">
                        {/* Dropdown Button */}
                        <button
                            onClick={() => setshowdropdown(!showdropdown)}
                            id="dropdownDefaultButton"
                            className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2 mx-4 text-center inline-flex items-center"
                            type="button"
                        >
                            Hi, {session.user.email}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {showdropdown && (
                            <div className="absolute top-full right-[10px] z-10 mt-2 bg-sky-950 divide-y divide-orange-800 rounded-lg shadow-sm w-44">
                                <ul className="py-2 text-sm text-gray-200">
                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:hover:text-white"
                                            onMouseDown={() => handleNav("/dashboard")}
                                        >
                                            Dashboard
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:hover:text-white"
                                            onMouseDown={() => handleNav(`/${session.user.name}`)}
                                        >
                                            Your Page
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            onMouseDown={() => {
                                                setTimeout(() => {
                                                    signOut({ callbackUrl: '/login' });
                                                }, 200);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:text-white cursor-pointer"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Auth Buttons */}
                {session ? (
                    <button
                        onClick={() => {
                            setTimeout(() => {
                                signOut({ callbackUrl: '/login' });
                            }, 200);
                        }}
                        className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2"
                    >
                        Sign out
                    </button>
                ) : (
                    <Link href="/login">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
