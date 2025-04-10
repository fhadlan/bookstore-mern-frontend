import React from "react";
import {
  useGetUsersQuery,
  usePatchAdminStatusMutation,
} from "../../../redux/features/admin/adminApi";
import { useNavigate, useOutletContext } from "react-router";
import Swal from "sweetalert2";

function ManageUsers() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { changeTitle, isAdmin } = useOutletContext();
  const { data: { users, totalPages } = {}, isLoading } = useGetUsersQuery({
    page: currentPage,
    search: "",
  });
  const [updateAdminStatus] = usePatchAdminStatusMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      return navigate("/dashboard");
    }
    changeTitle("Manage Users");
  }, []);

  React.useEffect(() => {
    console.log(users, totalPages);
  }, [users]);

  const handleToggle = async (e, id) => {
    const isChecked = e.target.checked;
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${isChecked ? "remove" : "make"} this user a superadmin?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    });
    if (confirmation.isConfirmed) {
      await updateAdminStatus({ id, isAdmin: isChecked });
    }
  };

  isLoading && <div className="loader"></div>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-slate-300 shadow-2xl">
          <thead>
            <tr className="bg-slate-300">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Super Admin</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user._id}
                className={`hover:bg-slate-200 ${
                  index % 2 === 1 ? "bg-slate-100" : "bg-white"
                } text-sm`}
              >
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    onChange={(e) => handleToggle(e, user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {[
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
          ]
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-white"
                } rounded-lg px-4 py-2 hover:bg-blue-400 hover:text-white`}
              >
                {page}
              </button>
            ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default ManageUsers;
