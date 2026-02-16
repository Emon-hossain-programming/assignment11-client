import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-5">
      <div className="text-center">
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-extrabold text-blue-900 opacity-10">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-orange-500 p-5 rounded-full shadow-2xl animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 -mt-5">
          Oops! Roadblock Ahead.
        </h2>
        <p className="text-gray-600 mt-4 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. Let's get you back on track!
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary bg-blue-800 border-none hover:bg-blue-900 px-8 text-white"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="btn btn-outline border-blue-800 text-blue-800 hover:bg-blue-800 hover:border-blue-800"
          >
            Report this Issue
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-16 h-2 bg-orange-500 rounded-full"></div>
          <div className="w-4 h-2 bg-blue-800 rounded-full"></div>
          <div className="w-4 h-2 bg-blue-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
