import { useParams, useNavigate } from "react-router-dom";
import { FaRocket, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

import useAxios from "../Hooks/useAxios";
import useAuth from "../Hooks/useAuth";

const BoostIssuesPaymentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleBoostPayment = async () => {
    const paymentData = {
      issueId: id,
      email: user?.email,
      name: user?.displayName,
      price: 100, 
      title: "Issue Priority Boost"
    };

    try {
      const res = await axiosSecure.post("/create-payment-intent", paymentData);
      if (res.data.url) {
        
        window.location.assign(res.data.url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-8 self-start md:ml-20 gap-2"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Top Header Section */}
        <div className="bg-primary p-8 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <FaRocket className="text-3xl text-white animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold">Priority Boost</h2>
          <p className="text-blue-100 text-sm mt-1">Make your issue stand out to Admins</p>
        </div>

        {/* Details Section */}
        <div className="p-8">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Service</span>
              <span className="font-bold text-gray-800">High Priority Upgrade</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Issue ID</span>
              <span className="font-mono text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded">
                #{id.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total Amount</span>
              <span className="text-3xl font-black text-gray-900">100 TK</span>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 space-y-3">
            <p className="text-xs text-gray-600 flex items-center gap-2">
              ✅ <span className="font-medium">Instant Rank Up:</span> Visible at the top of the list.
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-2">
              ✅ <span className="font-medium">Faster Review:</span> Admins are notified immediately.
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handleBoostPayment}
            className="btn btn-primary w-full text-lg font-bold shadow-lg shadow-blue-200"
          >
            Pay & Boost Now
          </button>

          {/* Secure Badge */}
          <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
            <FaShieldAlt className="text-sm" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Secured by Stripe
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostIssuesPaymentPage;