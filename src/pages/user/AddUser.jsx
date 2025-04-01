import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router";
import { useCreateUserMutation } from "../../redux/features/admin/adminApi";
import Swal from "sweetalert2";

function AddUser() {
  const { changeTitle, isAdmin } = useOutletContext();
  const navigate = useNavigate();
  const [createUser, { isLoading, isError }] = useCreateUserMutation();

  React.useEffect(() => {
    changeTitle("Create User");
    if (!isAdmin) {
      navigate("/dashboard");
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await createUser(data);
      if (!isError) {
        Swal.fire({
          icon: "success",
          title: "User added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] min-w-2xs items-center justify-center">
      <form
        className="mb-4 flex flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mb-2 flex flex-col text-sm font-bold text-gray-700">
          Name
          <input
            className="max-w-xs rounded border p-2"
            placeholder="Name"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="mb-2 flex flex-col text-sm font-bold text-gray-700">
          Email
          <input
            className="max-w-xs rounded border p-2"
            placeholder="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="mb-2 flex flex-col text-sm font-bold text-gray-700">
          Password
          <input
            className="max-w-xs rounded border p-2"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password should be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Must include at least 1 uppercase, 1 number, and 1 special character",
              },
            })}
          />
          {errors.password && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>
        <label className="mb-2 flex flex-col text-sm font-bold text-gray-700">
          Confirm Password
          <input
            className="max-w-xs rounded border p-2"
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="max-w-xs text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <label className="mb-2 flex flex-row text-sm font-bold text-gray-700">
          Super Admin?
          <input
            className="ml-2 max-w-xs rounded border p-2"
            placeholder="Super Admin?"
            type="checkbox"
            {...register("isAdmin")}
          />
        </label>
        <button
          className="max-w-xs rounded bg-blue-500 px-4 py-2 text-white"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default AddUser;
