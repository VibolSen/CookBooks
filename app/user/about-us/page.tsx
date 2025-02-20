import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function TeamSectionPage() {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Headline and Description */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Team Members
          </h1>
          <p className="mt-3 text-lg text-gray-600 sm:mt-4">
            We aim to make cooking accessible and enjoyable for everyone, no
            matter your skill level.
          </p>
        </div>

        {/* Team Members */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Member 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 transition-transform hover:scale-105">
            <img
              src="../team/team.png" // Replace with actual image URL
              alt="Mr. Sen Vibol"
              className="w-40 h-40 object-cover rounded-full mb-4 border-2 border-blue-200"
            />
            <h3 className="text-lg font-medium text-gray-900">Mr. Sen Vibol</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Member 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 transition-transform hover:scale-105">
            <img
              src="../team/team.png" // Replace with actual image URL
              alt="Mr. Khorn Soukhouch"
              className="w-40 h-40 object-cover rounded-full mb-4 border-2 border-blue-200"
            />
            <h3 className="text-lg font-medium text-gray-900">
              Mr. Khorn Soukhouch
            </h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Member 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 transition-transform hover:scale-105">
            <img
              src="../team/team.png" // Replace with actual image URL
              alt="Ms. Sam Nisa"
              className="w-40 h-40 object-cover rounded-full mb-4 border-2 border-blue-200"
            />
            <h3 className="text-lg font-medium text-gray-900">Ms. Sam Nisa</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">What is our vision to do next?</p>
          <p className="text-gray-700">
            Our team is made up of food enthusiasts, recipe developers, and
            culinary storytellers. We are committed to testing and refining
            every recipe, so you can be confident that when you cook with us,
            you're making something truly special.
          </p>
        </div>
      </div>
    </div>
  );
}