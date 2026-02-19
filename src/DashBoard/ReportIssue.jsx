import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";

const ReportIssue = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const onSubmit = async (data) => {
   
    if (!userData.isPremium && userData.issueCount >= 3) {
      Swal.fire({
        icon: "warning",
        title: "Limit Reached!",
        text: "Free users can report max 3 issues. Please subscribe for unlimited reports.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Profile & Subscribe",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/subcription");
        }
      });
      return;
    }

    try {
      
      const issueItem = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        photo: data.photo, 
        email: user?.email,
        status: "Pending",
        priority: "Normal",
        upvotes: 0,
        createdAt: new Date(), 
        timeline: [
          {
            status: "Pending",
            message: "Issue reported by citizen",
            time: new Date(),
          },
        ],
      };

     
      const issueRes = await axiosSecure.post("/user", issueItem);
      if (issueRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Issue Reported Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/MyIssues");
      }
    } catch (error) {
      console.error("Error saving issue:", error);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Report a Public Issue</h2>
          <p className="text-gray-500 mt-2">Help us make the city better by reporting infrastructure problems.</p>
          {!userData.isPremium && (
            <div className="badge badge-ghost mt-2 p-3 text-sm italic">
              Remaining Free Reports: {3 - (userData.issueCount || 0)} / 3
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div className="form-control">
            <label className="label font-bold text-gray-700">Issue Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Broken Streetlight"
              className="input input-bordered w-full"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>Select Category</option>
                <option value="Road Repair">Road Repair</option>
                <option value="Waste Management">Waste Management</option>
                <option value="Water Leakage">Water Leakage</option>
                <option value="Electricity">Electricity</option>
                <option value="Drainage">Drainage</option>
              </select>
            </div>
            {/* Location */}
            <div className="form-control">
              <label className="label font-bold text-gray-700">Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                placeholder="Ward No / Street Name"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Photo URL Input */}
          <div className="form-control">
            <label className="label font-bold text-gray-700">Photo URL</label>
            <input
              {...register("photo", { 
                required: "Image link is required",
                pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
                    message: "Please enter a valid image URL"
                }
              })}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered focus:ring-2 focus:ring-primary"
            />
            {errors.photo && (
              <span className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label font-bold text-gray-700">Detailed Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="textarea textarea-bordered h-32"
              placeholder="Provide as much detail as possible..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-bold text-lg shadow-md"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;