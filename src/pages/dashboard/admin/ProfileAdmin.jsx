import React from "react";
import { useForm } from "react-hook-form";
import {
  useAdminLogoutMutation,
  useChangePasswordAdminMutation,
} from "../../../redux/features/admin/adminApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function ProfileAdmin() {
  const [changePassword] = useChangePasswordAdminMutation();
  const [logout] = useAdminLogoutMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      await changePassword(data).unwrap();
      await Swal.fire({
        icon: "success",
        title: "Password changed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      await logout().unwrap();
      window.location.href = "/dashboard/login";
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
    <div>
      <div className="flex flex-row items-center justify-center p-2 shadow">
        <form className="flex w-xs flex-col" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-primary mb-6 text-3xl font-semibold">
            Change Password
          </h2>
          <label className="block">Current Password:</label>
          <input
            type="password"
            placeholder="Current Password"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-blue-500"
            {...register("currentPassword", {
              required: true,
              minLength: 8,
              maxLength: 20,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long and contain at least one letter and one number",
              },
            })}
          />
          {errors.currentPassword && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.currentPassword.message}
            </span>
          )}
          <label className="block">New Password:</label>
          <input
            type="password"
            placeholder="New Password"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-blue-500"
            {...register("newPassword", {
              required: true,
              minLength: 6,
              maxLength: 20,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must be at least 8 characters long and contain at least one letter and one number",
              },
            })}
          />
          {errors.newPassword && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.newPassword.message}
            </span>
          )}
          <label className="block">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 outline-none focus:border-blue-500 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === newPassword,
            })}
          />
          {errors.confirmPassword && (
            <span className="max-w-xs text-xs text-red-500">
              Passwords do not match
            </span>
          )}
          <button
            type="submit"
            className="mt-2 w-full rounded bg-blue-500 p-2 text-white"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileAdmin;
