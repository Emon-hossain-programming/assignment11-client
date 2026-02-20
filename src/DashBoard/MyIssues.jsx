import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa"; 
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; 

const MyIssues = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const modalRef = useRef();

  const {
    data: myIssues = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myIssues", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/myIssues?email=${user?.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myIssues/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your issue has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  const handleEditClick = (issue) => {
    setSelectedIssue(issue);
    modalRef.current.showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
    };

    const res = await axiosSecure.patch(
      `/allIssues/${selectedIssue._id}`,
      updatedData
    );
    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "The issue has been updated.", "success");
      refetch();
      modalRef.current.close();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Submitted Issues: {myIssues.length}</h2>
        <Link to="/dashboard/report-issue" className="btn btn-primary btn-sm">
           + Report New Issue
        </Link>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myIssues.map((issue, index) => (
              <tr key={issue._id} className="hover:bg-gray-50 transition-colors">
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                     
                      <img src={issue.photo} alt={issue.title} />
                    </div>
                  </div>
                </td>
                <td className="font-semibold text-gray-700">{issue.title}</td>
                <td>
                  <span className="badge badge-ghost">{issue.category}</span>
                </td>
                <td>
                  <span
                    className={`badge font-medium ${
                      issue.status === "Pending"
                        ? "badge-warning"
                        : issue.status === "Resolved"
                        ? "badge-success text-white"
                        : "badge-info text-white"
                    }`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    
                    <Link 
                      to={`/dashboard/issue-details/${issue._id}`} 
                      className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none"
                    >
                      <FaEye />
                    </Link>

                    {issue.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleEditClick(issue)}
                          className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Locked</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myIssues.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">No reports found.</h3>
           
            <Link to="/dashboard/ReportIssues" className="btn btn-primary mt-4">
              Create a new report
            </Link>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Issue</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control mb-2">
              <label className="label text-sm font-semibold">Title</label>
              <input
                name="title"
                type="text"
                defaultValue={selectedIssue?.title}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label text-sm font-semibold">Category</label>
              <select
                name="category"
                defaultValue={selectedIssue?.category}
                className="select select-bordered w-full"
              >
                <option value="Road Repair">Road Repair</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Electricity">Electricity</option>
                <option value="Drainage">Drainage</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label text-sm font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={selectedIssue?.description}
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyIssues;