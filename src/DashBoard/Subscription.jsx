import { FaCrown, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    
    navigate("/dashboard/payment");
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        Upgrade to Premium
      </h2>
      <p className="text-gray-500 mb-10 text-center max-w-md">
        Get unlimited reports, priority support, and real-time updates for your
        issues.
      </p>

      <div className="card w-96 bg-white shadow-2xl border-2 border-primary relative overflow-hidden">
        {/* Popular Tag */}
        <div className="absolute top-0 right-0 bg-primary text-white px-8 py-1 rotate-45 translate-x-8 translate-y-3 font-bold">
          PRO
        </div>

        <div className="card-body items-center text-center p-10">
          <div className="bg-yellow-100 p-4 rounded-full mb-4">
            <FaCrown className="text-yellow-600 text-4xl" />
          </div>
          <h3 className="card-title text-2xl font-bold">Lifetime Access</h3>
          <div className="flex items-baseline my-4">
            <span className="text-5xl font-extrabold">$19</span>
            <span className="text-gray-500 ml-1">/one-time</span>
          </div>

          <ul className="space-y-3 text-left mb-8">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Unlimited Reports
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Priority Review
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Verified Badge
            </li>
          </ul>

          <button
            onClick={handleSubscribe}
            className="btn btn-primary w-full text-lg font-bold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
