import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion"; 

const AllIssues = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxios();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const { data: issuesData = { result: [], count: 0 }, isLoading, refetch } = useQuery({
    queryKey: ["AllIssues", search, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allissues?search=${search}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const issues = issuesData.result || [];
  const count = issuesData.count || 0;
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );

  const handleUpvote = async (id, ownerEmail) => {
    if (!user) {
      Swal.fire("Please Login", "You need to login to upvote", "info");
      return navigate('/login');
    }
    if (user.email === ownerEmail) {
      return Swal.fire("Error", "You cannot upvote your own issue!", "error");
    }

    try {
      const res = await axiosSecure.patch(`/issue/upvote/${id}`, { email: user.email });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Thank you for your upvote.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Already Done!", err.response?.data?.message || "Error", "warning");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Public Issues</h2>
          <p className="text-gray-500">Search and explore reported issues in your area.</p>
        </div>

        <div className="form-control w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full focus:outline-primary transition-all duration-300"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(0);
            }}
          />
        </div>
      </motion.div>

      {/* Issues Grid with AnimatePresence */}
      <AnimatePresence mode="wait">
        {issues.length > 0 ? (
          <motion.div 
            key={currentPage + search} 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {issues.map((issuesCard, index) => (
              <motion.div
                key={issuesCard._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} 
                whileHover={{ y: -10 }}
                className="card bg-base-100 shadow-md border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <figure className="overflow-hidden relative">
                  <img
                    src={issuesCard.photo}
                    alt="Issue"
                    className="group-hover:scale-110 transition-transform duration-500 h-52 w-full object-cover"
                  />
                  <div className="absolute top-4 right-4 badge badge-neutral opacity-80 uppercase text-[10px] p-2">
                    {issuesCard.category}
                  </div>
                </figure>

                <div className="card-body p-6">
                  <div className={`badge font-bold mb-2 border-none ${
                    issuesCard.status === "Pending" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
                  }`}>
                    {issuesCard.status || "Pending"}
                  </div>

                  <h3 className="card-title text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
                    {issuesCard.title}
                  </h3>

                  <div className="mt-2">
                    <button
                      onClick={() => handleUpvote(issuesCard._id, issuesCard.email)}
                      className="btn btn-outline btn-sm flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      👍 {issuesCard.upvotes || 0} Upvotes
                    </button>
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link to={`/issue/${issuesCard._id}`} className="w-full">
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-primary btn-block shadow-lg shadow-primary/20"
                      >
                        Details View
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed"
          >
            <h3 className="text-xl font-semibold text-gray-400">No issues found matching your search.</h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination with Motion */}
      {numberOfPages > 1 && (
        <motion.div 
          layout 
          className="flex justify-center items-center mt-12 gap-2 flex-wrap"
        >
          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            Prev
          </button>

          {pages.map((page) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm ${currentPage === page ? "btn-primary text-white" : "btn-outline"}`}
            >
              {page + 1}
            </motion.button>
          ))}

          <button
            className="btn btn-outline btn-sm"
            onClick={() => setCurrentPage(Math.min(numberOfPages - 1, currentPage + 1))}
            disabled={currentPage === numberOfPages - 1}
          >
            Next
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AllIssues;