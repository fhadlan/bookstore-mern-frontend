import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {
  useGetAdminQuery,
  useLoginAdminMutation,
} from "../redux/features/admin/adminApi";

function AdminLogin() {
  const navigate = useNavigate();
  const [adminLogin, { isLoading }] = useLoginAdminMutation();
  const { data: admin } = useGetAdminQuery();

  React.useEffect(() => {
    if (admin) {
      navigate("/dashboard", { replace: true });
    }
  }, [admin, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await adminLogin(data).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] min-w-2xs items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          className="mb-4 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="mb-6 text-xl font-bold">Admin Login</h2>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">Enter email</p>
            )}
          </div>
          <div className="mb-2">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border border-gray-300 px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">Enter password</p>
            )}
          </div>
          <div className="mt-5">
            <button className="focus:shadow-outline flex w-full items-center justify-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700 focus:outline-none">
              {isLoading ? (
                <div className="flex h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} Book Store. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
