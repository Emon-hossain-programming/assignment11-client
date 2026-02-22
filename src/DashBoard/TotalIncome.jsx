import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useAxios from "../Hooks/useAxios";

const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

const TotalIncome = () => {
  const axiosSecure = useAxios();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-statistics");
      console.log(res.data);
      
      return res.data;
    },
  });
  const transactionId = useMemo(() => generateId(), []);

// pdf download
 const downloadPDF = () => {
    const doc = new jsPDF();

   
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129); 
    doc.text("Financial Transaction Report", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
    doc.text(`Total Revenue: ${stats?.totalRevenue || 0} TK`, 14, 37);

    
    const tableColumn = ["Transaction ID", "Source", "Status", "Amount"];
    
    
    const tableRows = [];

    
    stats?.boostedIssues?.forEach(issue => {
        const issueData = [
           transactionId || "N/A",  
            "Issue Priority Boost",
            issue.status,
            "100 TK"
        ];
        tableRows.push(issueData); 
    });

    
    autoTable(doc, {
        startY: 45,
        head: [tableColumn],
        body: tableRows, 
        theme: "grid",
        headStyles: { fillColor: [16, 185, 129] }, 
        styles: { fontSize: 9 },
    });

    doc.save(`Revenue_Report_${Date.now()}.pdf`);
};

  if (isLoading)
    return (
      <div className="text-center p-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Financial Overview
          </h2>
          <p className="text-gray-500 text-lg">
            Track your earnings and boosted contributions.
          </p>
        </div>

        {/* Stat Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Revenue Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-linear-to-br from-green-500 to-emerald-600 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <p className="text-green-100 font-medium uppercase tracking-wider text-sm">
                Total Revenue
              </p>
              <h3 className="text-5xl font-black mt-2">
                {stats?.totalRevenue || 0}{" "}
                <span className="text-2xl font-normal">TK</span>
              </h3>
              <div className="mt-6 flex items-center gap-2 bg-white/20 w-fit px-3 py-1 rounded-full text-xs">
                <span>▲ 12% increase from last month</span>
              </div>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 text-9xl">
              💰
            </div>
          </motion.div>

          {/* Boost Count Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Boosted Issues
              </p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                {stats?.totalBoosted || 0}
              </h3>
            </div>
            <div className="w-full bg-orange-100 h-2 rounded-full mt-4">
              <div className="bg-orange-500 h-2 rounded-full w-[70%]"></div>
            </div>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Efficiency: 70% conversion
            </p>
          </div>

          {/* Average Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
                Avg. per Issue
              </p>
              <h3 className="text-4xl font-bold text-gray-800 mt-2">
                100 <span className="text-xl">TK</span>
              </h3>
            </div>
            <div className="flex -space-x-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                ></div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs">
                +More
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              Based on current pricing
            </p>
          </div>
        </div>

        {/* Table: Recent Income History */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h4 className="font-bold text-gray-700 text-lg">
              Transaction Summary
            </h4>
            <button
              onClick={downloadPDF}
              className="btn btn-outline btn-primary btn-sm rounded-xl gap-2"
            >
              📥 Download PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-50/50">
                <tr className="text-gray-500 border-none">
                  <th>Transaction ID</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {stats?.totalBoosted> 0 && 
                   
                    <tr
                      
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="font-mono text-xs text-blue-600">
                        {transactionId || "N/A"}
                      </td>
                      <td className="font-medium text-gray-700">
                        Issue Priority Boost
                      </td>
                      <td>
                        <span className="badge badge-success badge-outline text-[10px] font-bold">
                          COMPLETED
                        </span>
                      </td>
                      <td className="font-bold text-gray-800">100 TK</td>
                    </tr>
                  
                
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TotalIncome;
