"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);
  const router = useRouter();

  const handleNav = async (path) => {
    setTimeout(() => {
      setshowdropdown(false);
    }, 100);
    router.push(path);
  };

  return (
    <nav className="bg-sky-950 text-white flex flex-wrap justify-between items-center px-2 sm:px-4 h-auto min-h-16 shadow-lg shadow-black/20">
      {/* Logo */}
      <Link
        className="logo font-bold text-lg flex items-center py-2"
        href="/"
      >
        <img
          className="invertIMG posto w-10 h-10"
          src="/robot.gif"
          alt="Logo"
        />
        <span className="text-2xl ml-2">
          SR7
          <span className="text-xl md:text-base text-orange-600 ml-1">
            DONO
          </span>
        </span>
      </Link>

      {/* Right Section */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        {session && (
          <div className="relative flex-shrink-0">
            {/* Dropdown Button */}
            <button
              onClick={() => setshowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 sm:px-4 inline-flex items-center whitespace-nowrap"
              type="button"
            >
              Hi, {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showdropdown && (
              <div className="absolute right-0 top-full z-10 mt-2 bg-sky-950 divide-y divide-orange-800 rounded-lg shadow-sm w-44">
                <ul className="py-2 text-sm text-gray-200">
                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:hover:text-white whitespace-nowrap"
                      onMouseDown={() => handleNav("/dashboard")}
                    >
                      Dashboard
                    </button>
                  </li>

                  <li>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:hover:text-white whitespace-nowrap"
                      onMouseDown={() => handleNav(`/${session.user.name}`)}
                    >
                      Your Page
                    </button>
                  </li>

                  <li>
                    <button
                      onMouseDown={() => {
                        setTimeout(() => {
                          signOut({ callbackUrl: "/login" });
                        }, 200);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 dark:hover:bg-orange-600 dark:text-white cursor-pointer whitespace-nowrap"
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
                signOut({ callbackUrl: "/login" });
              }, 200);
            }}
            className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 sm:px-4 whitespace-nowrap"
          >
            Sign out
          </button>
        ) : (
          <Link href="/login">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-orange-600 to-orange-700 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-orange-600 dark:focus:ring-orange-800 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 sm:px-4 whitespace-nowrap"
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
