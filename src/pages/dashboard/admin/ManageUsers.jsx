import React from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  usePatchAdminStatusMutation,
} from "../../../redux/features/admin/adminApi";
import { useNavigate, useOutletContext } from "react-router";
import Swal from "sweetalert2";
import { FaCircleDot, FaKey, FaSpinner, FaTrash } from "react-icons/fa6";

function ManageUsers() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const { changeTitle, isAdmin } = useOutletContext();
  const { data: { users, totalPages } = {}, isLoading } = useGetUsersQuery({
    page: currentPage,
    search: debouncedSearch,
  });
  const [updateAdminStatus] = usePatchAdminStatusMutation();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAdmin) {
      return navigate("/dashboard");
    }
    changeTitle("Manage Users");
  }, []);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleToggle = async (e, id) => {
    const isChecked = e.target.checked;
    const confirmation = await Swal.fire({
      title: `Are you sure you want to ${!isChecked ? "remove" : "make"} this user a superadmin?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    });
    if (confirmation.isConfirmed) {
      await updateAdminStatus({ id, isAdmin: isChecked });
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirmation.isConfirmed) {
        await deleteUser(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <FaSpinner className="size-32 animate-spin" />
          </div>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-slate-300 shadow-2xl">
            <thead>
              <tr className="bg-slate-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Super Admin</th>
                <th className="px-4 py-2">Actions</th>
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
                  <td className="px-4 py-2">
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
                      <FaKey />
                    </button>
                    <button
                      className="ml-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
