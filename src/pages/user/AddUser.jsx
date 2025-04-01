import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router";

function AddUser() {
  const { changeTitle, isAdmin } = useOutletContext();
  const navigate = useNavigate();

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] min-w-2xs items-center justify-center">
      <form
        className="mb-4 flex flex-col rounded bg-white px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
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
