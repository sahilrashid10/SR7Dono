import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SR7DONO",
  description: "This website is a crowdfunding platform for Anyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/SR7_Logo.png" />
      <body className=" text-white">
        <SessionWrapper>
          <Navbar />
          <div className=" bg-sky-800 min-h-screen  text-white">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
