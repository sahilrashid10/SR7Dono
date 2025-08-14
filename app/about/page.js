import React from "react";
import Image from "next/image";

export const metadata = {
  title: "About - SR7-Dono",
};

const About = () => {
  return (
    <div className="container mx-auto px-6 md:px-4 py-12 space-y-16">
      {/* Main Title */}
      <h1 className="font-bold flex gap-6 md:gap-20 justify-center items-center text-3xl md:text-5xl text-white mb-8">
        SR7
        <span className="text-orange-600 text-2xl md:text-4xl">DONO</span>
      </h1>

      {/* Intro Paragraph */}
      <p className="text-lg md:text-xl text-white text-center max-w-3xl mx-auto">
        SR7-Dono is a vibrant crowdfunding platform where creators get support
        directly from their fans. Fuel your creativity, bring your ideas to
        life, and connect with a community that believes in you.
      </p>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex items-center p-6 bg-purple-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="/group.gif"
              width={96}
              height={96}
              alt="Fans Collaborate"
              className="rounded-full mr-6"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2 text-purple-700">
                Fans Collaborate
              </h3>
              <p className="text-gray-600">
                Your fans are eager to collaborate and support your projects
                directly.
              </p>
            </div>
          </div>

          <div className="flex items-center p-6 bg-yellow-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
              src="/coin.gif"
              width={96}
              height={96}
              alt="Support Through Donations"
              className="rounded-full mr-6"
            />
            <div>
              <h3 className="text-2xl font-bold mb-2 text-yellow-700">
                Support Through Donations
              </h3>
              <p className="text-gray-600">
                Receive contributions that directly help fund your creative
                endeavors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          Benefits for Creators & Fans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4 text-purple-700">
              For Creators
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Direct financial support from fans</li>
              <li>Engage with your audience personally</li>
              <li>Access resources and mentorship</li>
              <li>Showcase your projects globally</li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold mb-4 text-yellow-700">For Fans</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Directly contribute to creators' success</li>
              <li>Exclusive rewards for your support</li>
              <li>Be part of the creative journey</li>
              <li>Connect and collaborate with creators</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Community & Collaboration */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Community & Collaboration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-green-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-green-700">Collaborate</h3>
            <p className="text-gray-600">
              Unlock opportunities through teamwork and creative partnerships.
            </p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Engage</h3>
            <p className="text-gray-600">
              Participate in discussions, events, and community feedback.
            </p>
          </div>
          <div className="p-6 bg-pink-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-3 text-pink-700">Grow</h3>
            <p className="text-gray-600">
              Access resources, mentorship, and recognition to elevate your
              creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Text */}
      <p className="text-center text-gray-500 mt-16">
        © {new Date().getFullYear()} SR7-Dono. All rights reserved.
      </p>
    </div>
  );
};

export default About;
