import React from "react";
import { useQuery } from "@tanstack/react-query";

import { FaUsers, FaFileAlt, FaCheckCircle, FaWallet } from "react-icons/fa"; 
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import useAxios from "../Hooks/useAxios";

const AdminHome = () => {
  const axiosSecure = useAxios();

  const { data: adminStats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      
      const chartData = [
        { name: "Total Users", value: res.data.totalUsers },
        { name: "Total Issues", value: res.data.totalIssues },
        { name: "Resolved", value: res.data.resolvedIssues },
      ];
      return { ...res.data, chartData };
    },
  });

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard Overview</h2>

      {/* Stats Cards -*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="stats shadow bg-blue-500 text-white">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaUsers /></div>
            <div className="stat-title text-white">Total Users</div>
            <div className="stat-value">{adminStats.totalUsers}</div>
          </div>
        </div>

        <div className="stats shadow bg-green-600 text-white">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaWallet /></div>
            <div className="stat-title text-white">Total Revenue</div>
            <div className="stat-value">৳{adminStats.revenue}</div>
          </div>
        </div>

        <div className="stats shadow bg-orange-500 text-white">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaFileAlt /></div>
            <div className="stat-title text-white">All Reports</div>
            <div className="stat-value">{adminStats.totalIssues}</div>
          </div>
        </div>

        <div className="stats shadow bg-teal-500 text-white">
          <div className="stat">
            <div className="stat-figure text-3xl"><FaCheckCircle /></div>
            <div className="stat-title text-white">Resolved</div>
            <div className="stat-value">{adminStats.resolvedIssues}</div>
          </div>
        </div>
      </div>

      {/* Graph Section */}
      <div className="bg-white p-10 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold mb-5">System Analytics Graph</h3>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminStats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {adminStats.chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;