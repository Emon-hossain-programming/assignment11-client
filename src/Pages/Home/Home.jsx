import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const Home = () => {
  const axiosSecure = useAxios();
  const { data: homeIssues = [] } = useQuery({
    queryKey: ["HomeIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/home-issues");
      console.log(res.data);

      return res.data;
    },
  });
  return (
    <div className="bg-base-100">
      {/* 1. Hero / Banner Section */}
      <div
        className="hero min-h-[70vh]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1573161818529-79ff12261b47?q=80&w=2069')`,
        }}
      >
        <div className="hero-overlay bg-opacity-70 bg-blue-900"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Build a Better City Together
            </h1>
            <p className="mb-5 text-lg">
              Report public infrastructure issues in your area and track their
              resolution in real-time. Your voice matters!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/allIssues"
                className="btn btn-primary bg-orange-500 border-none hover:bg-orange-600 px-8"
              >
                View Issues
              </Link>
              <button className="btn btn-outline text-white border-white hover:bg-white hover:text-blue-900">
                How it Works
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 py-20">
        {/* 2. Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 -mt-32">
          <div className="card bg-base-100 shadow-xl p-8 text-center border-b-4 border-blue-600">
            <div className="text-4xl font-bold text-blue-900 mb-2">1,200+</div>
            <div className="text-gray-500 font-medium uppercase tracking-wider">
              Reported Issues
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-8 text-center border-b-4 border-orange-500">
            <div className="text-4xl font-bold text-orange-500 mb-2">850+</div>
            <div className="text-gray-500 font-medium uppercase tracking-wider">
              Fixed Problems
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl p-8 text-center border-b-4 border-green-500">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-500 font-medium uppercase tracking-wider">
              Active Monitoring
            </div>
          </div>
        </div>

        {/* 3. Latest Issues Preview (Placeholder for Data) */}
        <div className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Latest Reported Issues
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 mt-2"></div>
            </div>
            <Link
              to="/allIssues"
              className="text-blue-600 font-bold hover:underline"
            >
              View All Issues →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sample Card 1 */}

            {homeIssues.map((issuesCard, i) => (
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
                  <h3 className="card-title text-gray-800">
                    {issuesCard.title}
                  </h3>
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
        </div>

        {/* 4. Feature Section / How It Works */}
        <div className="bg-blue-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-blue-200">
                1
              </div>
              <h4 className="text-xl font-bold mb-2">Report</h4>
              <p className="text-gray-600">
                Take a photo and report the issue with location details.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-orange-200">
                2
              </div>
              <h4 className="text-xl font-bold mb-2">Verify</h4>
              <p className="text-gray-600">
                City maintenance staff will verify the reported problem.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-green-200">
                3
              </div>
              <h4 className="text-xl font-bold mb-2">Resolve</h4>
              <p className="text-gray-600">
                Authorities fix the issue and update the status online.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
