
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const ManageIssues = () => {
  const axiosSecure = useAxios();

  const { data: allIssues = [], refetch } = useQuery({
    queryKey: ["allIssues"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allIssues");
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
