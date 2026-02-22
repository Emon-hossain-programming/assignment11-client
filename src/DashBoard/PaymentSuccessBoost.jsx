import { useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { FaCheckCircle, FaRocket, FaArrowRight } from "react-icons/fa";
import Confetti from "react-confetti"; 
import { useWindowSize } from "react-use"; 

const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

const PaymentSuccessBoost = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxios();
//   const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const email = searchParams.get("email");
  const issueId = searchParams.get("issueId");
  const transactionId = useMemo(() => generateId(), []);

  useEffect(() => {
    if (issueId) {
      axiosSecure
        .patch(`/issue/boost/${issueId}`, {
          email: email,
          paymentStatus: "Completed",
          transactionId: transactionId,
        })
        .then((res) => {
          console.log("Database Updated:", res.data);
        })
        .catch((err) => console.error("Update Error:", err));
    }
  }, [issueId, email, axiosSecure,transactionId]);

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-green-100 relative overflow-hidden">
        {/* Decorative Background Circle */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full"></div>

        <div className="relative">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-2">
            Payment Success!
          </h2>
          <p className="text-gray-500 mb-8">
            Great news! Your issue has been successfully boosted to{" "}
            <span className="text-primary font-bold">High Priority</span>.
          </p>

          <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-2 text-blue-800 font-bold justify-center">
              <FaRocket className="animate-bounce" /> Boost Activated
            </div>
            <p className="text-xs text-blue-600 leading-relaxed">
              Admins have been notified. Your issue will now appear at the top
              of their dashboard for immediate review.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to={`/dashboard/issue-tracking/${issueId}`}
              className="btn btn-primary w-full gap-2 rounded-xl shadow-lg shadow-blue-200"
            >
              Track Progress <FaArrowRight />
            </Link>

            <Link
              to="/dashboard/MyIssues"
              className="btn btn-ghost w-full text-gray-400"
            >
              Back to My Issues
            </Link>
          </div>

          <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            Transaction ID:{" "}
            {transactionId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessBoost;
