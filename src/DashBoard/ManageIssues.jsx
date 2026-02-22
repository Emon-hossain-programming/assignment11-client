import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const ManageIssues = () => {
  const axiosSecure = useAxios();

  const { data: allIssues = [], refetch } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allIssuess");
      return res.data;
    },
  });

  const handleUpdateStatus = async (id, newStatus) => {
    const res = await axiosSecure.patch(`/allIssues/status/${id}`, {
      status: newStatus,
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", `Status updated to ${newStatus}`, "success");
      refetch();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Total Issues: {allIssues.length}
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>User Email</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allIssues.map((issue, idx) => (
              <tr key={issue._id}>
                <td>{idx + 1}</td>
                <td className="font-medium">{issue.title}</td>
                <td>{issue.email}</td>
                <td>
                  <span className="badge badge-ghost">{issue.category}</span>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border
    ${
      issue.priority === "High"
        ? "bg-red-50 text-red-700 border-red-200 shadow-sm shadow-red-100 animate-pulse"
        : issue.priority === "Medium"
          ? "bg-amber-50 text-amber-700 border-amber-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200"
    }`}
                  >
                    {/* High Priority dot*/}
                    {issue.priority === "High" && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                      </span>
                    )}

                    {issue.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${issue.status === "Pending" ? "badge-warning" : "badge-success"}`}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-xs"
                    value={issue.status}
                    onChange={(e) =>
                      handleUpdateStatus(issue._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageIssues;
