import React from "react";
import { Link } from "react-router-dom";
import {
  FaTimesCircle,
  FaArrowLeft,
  FaExclamationTriangle,
} from "react-icons/fa";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const PaymentCancelForBoost = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-50 relative overflow-hidden"
      >
        {/* Decorative Background Element */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-50 rounded-full opacity-50"></div>

        <div className="relative">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="text-red-500 text-5xl" />
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-2">
            Payment Cancelled!
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            It looks like the payment process was cancelled or something went
            wrong. Don't worry, no funds were deducted from your account.
          </p>

          {/* Warning Box */}
          <div className="bg-amber-50 rounded-2xl p-6 mb-8 border border-amber-100 text-left">
            <div className="flex items-center gap-2 text-amber-800 font-bold mb-1">
              <FaExclamationTriangle /> Common Reasons:
            </div>
            <ul className="text-xs text-amber-700 space-y-1 list-disc list-inside opacity-80">
              <li>Transaction timed out</li>
              <li>Payment window was closed</li>
              <li>Bank declined the connection</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/dashboard/MyIssues"
              className="btn btn-error w-full gap-2 text-white rounded-xl shadow-lg shadow-red-200"
            >
              Try Again
            </Link>

            <Link
              to="/"
              className="btn btn-ghost w-full text-gray-400 gap-2 flex items-center justify-center"
            >
              <FaArrowLeft className="text-xs" /> Back to Home
            </Link>
          </div>

          <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Error Code: PAY_CANCEL_USR
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelForBoost;