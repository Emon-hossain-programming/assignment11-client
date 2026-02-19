import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUsers, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../Hooks/useAxios";

const AllUser = () => {
  const axiosSecure = useAxios();

  // সব ইউজারদের ডাটাবেস থেকে নিয়ে আসা
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
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
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch(); 
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error(error);
          });
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary">
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <FaUsers className="text-primary" /> Total Users: {users.length}
        </h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
              <th className="py-4">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
              <th>DELETE USER</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                <td className="font-bold">{index + 1}</td>
                <td>
                  <div className="font-semibold">{user.name || "N/A"}</div>
                </td>
                <td className="text-gray-600">{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    <div className="badge badge-primary badge-outline font-bold p-3">
                      Admin
                    </div>
                  ) : (
                    <div className="badge badge-ghost font-medium p-3">
                      Citizen
                    </div>
                  )}
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-success font-medium italic">
                      Authorized
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white gap-2"
                      title="Make Admin"
                    >
                      <FaUserShield /> Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn btn-ghost btn-xs text-red-500"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
