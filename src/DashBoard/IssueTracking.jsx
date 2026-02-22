import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaCheckCircle, FaClock, FaTools, FaCheckDouble, FaRocket, FaMapMarkerAlt } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";


const IssueTracking = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: issue = {}, isLoading, } = useQuery({
    queryKey: ["issue-tracking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto font-sans">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6 flex items-center gap-2 hover:bg-base-200 transition-all"
      >
        <FaArrowLeft /> Back to My Issues
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Issue Summary & Action Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card bg-white shadow-2xl border border-gray-100 overflow-hidden sticky top-10">
            <figure className="relative">
              <img
                src={issue.photo}
                alt="Issue"
                className="h-56 w-full object-cover"
              />
              <div className={`absolute top-4 right-4 badge p-3 font-bold text-white border-none shadow-lg ${
                issue.priority === "High" ? "bg-red-500" : "bg-blue-500"
              }`}>
                {issue.priority} Priority
              </div>
            </figure>

            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-bold text-gray-800">{issue.title}</h2>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <FaMapMarkerAlt className="text-primary" />
                <span>{issue.location}</span>
              </div>
              
              <div className="divider my-4"></div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-semibold text-gray-700">{issue.category}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${
                    issue.status === "Resolved" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  }`}>
                    {issue.status}
                  </span>
                </div>
              </div>

              {/* 🔥 Boost Action Section 🔥 */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                {issue.priority === "Normal" ? (
                  <div className="space-y-3">
                    <p className="text-[11px] text-center text-blue-600 font-bold uppercase tracking-widest">
                      ⚡ Need Faster Solution?
                    </p>
                    <Link 
                      to={`/dashboard/payment/${issue._id}`}
                      className="btn btn-primary w-full shadow-lg shadow-blue-200 gap-2 hover:scale-105 transition-transform"
                    >
                      <FaRocket className="animate-bounce" /> Boost Issue (100 TK)
                    </Link>
                    <p className="text-[10px] text-center text-gray-400">
                      Boosted issues appear at the top for admins.
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                    <p className="text-red-600 font-bold flex items-center justify-center gap-2">
                      <FaRocket /> Priority Boosted
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">This issue is already on High Priority</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline Tracking */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-50">
            <h3 className="text-2xl font-black mb-10 text-gray-800 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <FaClock className="text-primary text-xl" />
              </div>
              Issue Tracking Timeline
            </h3>

            <div className="relative">
              {/* Vertical line connecting the steps */}
              <div className="absolute left-4.75 top-2 bottom-2 w-1 bg-gray-100 hidden md:block"></div>

              <div className="space-y-12">
                {issue.timeline && issue.timeline.length > 0 ? (
                  issue.timeline.map((step, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-6 relative">
                      {/* Icon with Ring */}
                      <div className="z-10 bg-white rounded-full p-1 ring-8 ring-white shrink-0">
                        {index === 0 ? (
                          <div className="bg-primary p-2 rounded-full shadow-lg shadow-primary/30">
                            <FaCheckCircle className="text-white text-lg" />
                          </div>
                        ) : (
                          <div className="bg-green-500 p-2 rounded-full shadow-lg shadow-green-200">
                            <FaCheckDouble className="text-white text-lg" />
                          </div>
                        )}
                      </div>

                      {/* Content Box */}
                      <div className="flex-1 bg-gray-50/50 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-xl transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                          <h4 className="font-black text-xl text-gray-800 group-hover:text-primary transition-colors">
                            {issue.status}
                          </h4>
                          <span className="text-[11px] font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 text-gray-500">
                            {new Date(step.time).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {step.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty state timeline */
                  <div className="flex flex-col md:flex-row gap-6 relative">
                    <div className="z-10 bg-primary p-3 rounded-full shadow-lg">
                       <FaCheckCircle className="text-white text-xl" />
                    </div>
                    <div className="flex-1 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 text-lg">Issue Reported Successfully</h4>
                      <p className="text-blue-700 text-sm mt-1">Your case is now in our system. A staff member will be assigned shortly.</p>
                      <p className="text-[11px] mt-4 font-mono text-blue-400">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : ""}
                      </p>
                    </div>
                  </div>
                )}

                {/* Status Indicator for Next Steps */}
                {issue.status === "Pending" && (
                  <div className="flex flex-col md:flex-row gap-6 relative opacity-60 grayscale-[0.5]">
                    <div className="z-10 bg-gray-200 p-3 rounded-full">
                       <FaTools className="text-gray-500 text-xl" />
                    </div>
                    <div className="flex-1 border-2 border-dashed border-gray-200 p-6 rounded-2xl">
                      <h4 className="font-bold text-gray-500 italic text-lg">Staff Assignment Under Process</h4>
                      <p className="text-gray-400 text-sm mt-1">Once assigned, you can see the staff profile here.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;