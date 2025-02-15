import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.config";
import { useAuth } from "../../context/AuthContext";
import { useChangePasswordMutation } from "../../redux/features/userCustomer/userApi";

function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const { changeUserPassword } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await changeUserPassword(data.currentPassword, data.newPassword);
      // const user = auth.currentUser;
      // const passwordData = {
      //   uid: user.uid,
      //   currentPassword: data.currentPassword,
      //   newPassword: data.newPassword,
      // };
      // console.log(passwordData);
      // await changePassword(passwordData);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <label className="flex flex-col">
          Current Password
          <input
            type="password"
            placeholder="Current Password"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />
          {errors.currentPassword && (
            <span className="text-sm text-red-500">
              {errors.currentPassword.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          New Password
          <input
            type="password"
            placeholder="New Password"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("newPassword", {
              required: "Please enter a new password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Must include at least 1 uppercase, 1 number, and 1 special character",
              },
            })}
          />
          {errors.newPassword && (
            <span className="text-sm text-red-500">
              {errors.newPassword.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          Confirm Password
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
