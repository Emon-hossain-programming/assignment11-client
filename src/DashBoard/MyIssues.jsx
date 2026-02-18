import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // আইকন যোগ করলে সুন্দর লাগবে
import Swal from "sweetalert2";

const MyIssues = () => {
  const [issues, setIssues] = useState(null);
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
      title: "আপনি কি নিশ্চিত?",
      text: "একবার ডিলিট করলে এটি আর ফিরে পাওয়া যাবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, ডিলিট করুন!",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myIssues/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "ডিলিট হয়েছে!",
              "আপনার ইস্যুটি সফলভাবে মুছে ফেলা হয়েছে।",
              "success",
            );
            refetch(); // টেবিল থেকে ডাটা আপডেট করার জন্য
          }
        });
      }
    });
  };

  const handleDetails = (issues) => {
    setIssues(issues);
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
      `/allissues/${issues._id}`,
      updatedData,
    );
    if (res.data.modifiedCount > 0) {
      Swal.fire("সফল!", "ইস্যুটি আপডেট করা হয়েছে।", "success");
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
      <h2 className="text-2xl font-bold mb-4">
        My Submitted Issues: {myIssues.length}
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table w-full">
          {/* head */}
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
              <tr
                key={issue._id}
                className="hover:bg-gray-50 transition-colors"
              >
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
                    {issue.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => handleDetails(issue)}
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
                      <span className="text-xs text-gray-400 italic">
                        No Action
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myIssues.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <h3 className="text-xl font-medium text-gray-600">
              No reports found.
            </h3>
            <Link to="/addIssue" className="btn btn-primary mt-4">
              "Create a new report"
            </Link>
          </div>
        )}
      </div>

      {/* modal */}
      <dialog
        ref={modalRef}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Issue</h3>

          <form onSubmit={handleUpdate}>
            <div className="form-control mb-2">
              <label className="label text-sm font-semibold">Title</label>
              <input
                name="title"
                type="text"
                defaultValue={issues?.title}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label text-sm font-semibold">Category</label>
              <select
                name="category"
                defaultValue={issues?.category}
                className="select select-bordered w-full"
              >
                <option value="Roads">Roads</option>
                <option value="Electricity">Electricity</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water">Water</option>
              </select>
            </div>

            <div className="form-control mb-4">
              <label className="label text-sm font-semibold">Description</label>
              <textarea
                name="description"
                defaultValue={issues?.description}
                className="textarea textarea-bordered h-24"
                required
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-blue-500 text-white border-none"
              >
                Update Now
              </button>
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
