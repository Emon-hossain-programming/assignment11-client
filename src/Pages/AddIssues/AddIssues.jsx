import React from 'react';
import { useForm } from "react-hook-form";

const AddIssues = () => {
    // react-hook-form এর প্রয়োজনীয় জিনিসপত্র
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // এখানে data অবজেক্টে সব ইনপুট ভ্যালু চলে আসবে
        const issueData = {
            ...data,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        console.log("Form Data:", issueData);
        
        // এখানে আপনার fetch বা axios কল হবে
        // fetch('http://localhost:5000/issues', { method: 'POST', ... })
        
        alert("Issue Reported Successfully!");
        reset(); // ফর্ম ক্লিয়ার করার জন্য
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-5">
            <div className="max-w-3xl mx-auto card bg-base-100 shadow-2xl border-t-8 border-blue-900">
                <div className="card-body p-8">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-2">Report New Issue</h2>
                    <p className="text-center text-gray-500 mb-8">Fill out the form below to report a public concern.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        {/* Issue Title */}
                        <div className="form-control">
                            <label className="label font-semibold">Issue Title</label>
                            <input 
                                {...register("title", { required: "Title is required", minLength: {value: 10, message: "Title must be 10 characters"} })}
                                type="text" 
                                placeholder="Short name of the problem" 
                                className={`input input-bordered focus:outline-blue-600 ${errors.title ? 'border-red-500' : ''}`}
                            />
                            {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Category Dropdown */}
                            <div className="form-control">
                                <label className="label font-semibold">Category</label>
                                <select 
                                    {...register("category", { required: "Please select a category" })}
                                    className="select select-bordered focus:outline-blue-600"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Roads">Roads & Transport</option>
                                    <option value="Water">Water & Sewerage</option>
                                    <option value="Electricity">Electricity & Power</option>
                                    <option value="Waste">Waste Management</option>
                                </select>
                                {errors.category && <span className="text-red-500 text-sm mt-1">{errors.category.message}</span>}
                            </div>

                            {/* Location */}
                            <div className="form-control">
                                <label className="label font-semibold">Location</label>
                                <input 
                                    {...register("location", { required: "Location is required" })}
                                    type="text" 
                                    placeholder="Area name" 
                                    className="input input-bordered focus:outline-blue-600"
                                />
                                {errors.location && <span className="text-red-500 text-sm mt-1">{errors.location.message}</span>}
                            </div>
                        </div>

                        {/* Photo URL */}
                        <div className="form-control">
                            <label className="label font-semibold">Photo URL</label>
                            <input 
                                {...register("photo", { required: "Image link is required" })}
                                type="url" 
                                placeholder="https://example.com/image.jpg" 
                                className="input input-bordered focus:outline-blue-600"
                            />
                            {errors.photo && <span className="text-red-500 text-sm mt-1">{errors.photo.message}</span>}
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label font-semibold">Description</label>
                            <textarea 
                                {...register("description", { required: "Description is required" })}
                                className="textarea textarea-bordered h-32 focus:outline-blue-600" 
                                placeholder="Explain the problem in detail..."
                            ></textarea>
                            {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary bg-blue-900 border-none hover:bg-blue-950 text-white font-bold">
                                Submit Issue Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddIssues;