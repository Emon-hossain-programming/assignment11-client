import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import useAxios from "../Hooks/useAxios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CitizenHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: stats = [] } = useQuery({ // ডিফল্ট ভ্যালু খালি অ্যারে দিন
  queryKey: ["citizen-stats", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/citizen-stats/${user?.email}`);
    
    
    const chartData = [
      { name: "Total", count: res.data.totalIssues },
      { name: "Pending", count: res.data.pendingIssues },
      { name: "Resolved", count: res.data.resolvedIssues },
    ];
    
    return { ...res.data, chartData }; 
  },
});

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}!</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-6 bg-blue-100 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Total Report</h3>
          <p className="text-3xl font-bold">{stats.totalIssues || 0}</p>
        </div>
        <div className="p-6 bg-yellow-100 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-3xl font-bold">{stats.pendingIssues || 0}</p>
        </div>
        <div className="p-6 bg-green-100 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Resolved</h3>
          <p className="text-3xl font-bold">{stats.resolvedIssues || 0}</p>
        </div>
        <div className="p-6 bg-purple-100 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Toatl payment</h3>
          <p className="text-3xl font-bold">৳ {stats.totalPayments || 0}</p>
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-xl shadow h-[450px] flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4 w-full text-left">
          Report status Graph
        </h3>

        <BarChart
          width={600}
          height={300}
          data={stats.chartData} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Count" />
        </BarChart>
      </div>
    </div>
  );
};

export default CitizenHome;
