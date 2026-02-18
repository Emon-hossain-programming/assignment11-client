import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const AllIssues = () => {
  const axiosSecure = useAxios();
  const { data: AllIssues = [], isLoading } = useQuery({
    queryKey: ["AllIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allissues");
      console.log(res.data);

      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-primary"></span>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {AllIssues.map((issuesCard, i) => (
        <div
          key={i}
          className="card bg-base-100 shadow-md border border-gray-100 overflow-hidden group"
        >
          <figure className="overflow-hidden">
            <img
              src={issuesCard.photo}
              alt="Issue"
              className="group-hover:scale-110 transition-transform duration-300 h-48 w-full object-cover"
            />
          </figure>
          <div className="card-body p-6">
            <div className="badge badge-secondary bg-orange-100 text-orange-600 border-none font-bold mb-2">
              Pending
            </div>
            <h3 className="card-title text-gray-800">{issuesCard.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {issuesCard.category}
            </p>
            <div className="card-actions justify-end mt-4">
              <Link to={`/issue/${issuesCard._id}`}>
                <button className="btn btn-primary">Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllIssues;
