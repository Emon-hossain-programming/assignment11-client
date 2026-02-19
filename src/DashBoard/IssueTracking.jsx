import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaCheckCircle, FaClock, FaTools, FaCheckDouble } from "react-icons/fa";
import useAxios from "../Hooks/useAxios";

const IssueTracking = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: issue = {}, isLoading } = useQuery({
    queryKey: ["issue-tracking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/issue/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-6 flex items-center gap-2 hover:bg-gray-200"
      >
        <FaArrowLeft /> Back to My Issues
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side card and image */}
        <div className="lg:col-span-1">
          <div className="card bg-white shadow-xl border border-gray-100 overflow-hidden">
            <figure>
              <img
                src={issue.photo} 
                alt="Issue"
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body p-5">
              <h2 className="card-title text-xl font-bold">{issue.title}</h2>
              <div className="badge badge-outline mt-1">{issue.category}</div>
              <div className="divider"></div>
              <p className="text-sm text-gray-500">
                <strong>Reported On:</strong>{" "}
                {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "N/A"} 
               
              </p>
              <p className="text-sm text-gray-500">
                <strong>Location:</strong> {issue.location}
              </p>

              <div className="mt-4">
                <span
                  className={`badge p-3 font-bold ${
                    issue.status === "Resolved"
                      ? "badge-success text-white"
                      : "badge-warning"
                  }`}
                >
                  Status: {issue.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* right side timeLine*/}

        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-50 min-h-[450px]">
            <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
              <FaClock className="text-primary" /> Issue Progress Timeline
            </h3>

            <div className="relative border-l-4 border-primary ml-4 space-y-10">
              {issue.timeline && issue.timeline.length > 0 ? (
                issue.timeline.map((step, index) => (
                  <div key={index} className="relative ml-8">
                    {/* icon  */}
                    <div className="absolute -left-[44px] mt-1 bg-white rounded-full p-1 border-2 border-primary">
                      {index === 0 ? (
                        <FaCheckCircle className="text-primary text-xl" />
                      ) : (
                        <FaCheckDouble className="text-green-500 text-xl" />
                      )}
                    </div>
                    {/* main content */}
                    <div className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-100">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-lg text-gray-800">
                          {step.status}
                        </h4>
                        <span className="text-[11px] font-semibold bg-blue-100 text-blue-600 px-2 py-1 rounded">
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
                <div className="relative ml-8">
                   <div className="absolute -left-[44px] mt-1 bg-white rounded-full p-1 border-2 border-primary">
                      <FaCheckCircle className="text-primary text-xl" />
                   </div>
                   <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-bold text-blue-800">Issue Reported</h4>
                      <p className="text-gray-600 text-sm">Your issue has been successfully submitted and is under review.</p>
                      <span className="text-[10px] text-blue-500 italic">
                        {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : ""}
                      </span>
                   </div>
                </div>
              )}

              {issue.status === "Pending" && (
                <div className="relative ml-8 opacity-50">
                  <div className="absolute -left-[44px] mt-1 bg-gray-200 rounded-full p-1 border-2 border-gray-300">
                    <FaTools className="text-gray-400 text-xl" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-400">
                      Next Step: Review & Assignment
                    </h4>
                    <p className="text-gray-400 text-sm italic">
                      Waiting for authority to assign staff...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTracking;