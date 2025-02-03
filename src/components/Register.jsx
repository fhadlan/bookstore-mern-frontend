import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const [message, setMessage] = React.useState();
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    try {
      await registerUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Registration successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      const errorMessage = String(error.message);
      if (errorMessage.includes("auth/email-already-in-use")) {
        setMessage("Email already in use");
      } else if (errorMessage.includes("auth/weak-password")) {
        setMessage("Password should be at least 6 characters");
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <div className="h-[calc( 100vh - 64px)] flex items-center">
      <div className="mx-auto mb-4 w-full max-w-sm rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <h2 className="font-primary mb-4 text-xl font-semibold">
          Please Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="font-secondary mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="w-full rounded-md p-2 leading-tight shadow transition-all duration-200 focus:shadow-blue-400 focus:outline-none"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label
              className="font-secondary mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-md p-2 leading-tight shadow transition-all duration-200 focus:shadow-blue-400 focus:outline-none"
              {...register("password", { required: true })}
            />
          </div>
          {message && (
            <div className="mb-4">
              <p className="mb-3 text-red-600">{message}</p>
            </div>
          )}
          <div>
            <button className="btn-primary font-primary">Register</button>
          </div>
        </form>
        <p className="mt-4 mb-4 align-baseline text-sm font-medium">
          Already have an account? Please{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        {/* google sign-in method*/}
        {/* <div className="mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="font-primary flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-blue-800"
          >
            <FaGoogle />
            Sign in With Google
          </button>
        </div> */}
        <p className="text-center text-sm text-gray-600">
          &copy; 2022 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
