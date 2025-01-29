import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  const [message, setMessage] = React.useState("message");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleGoogleSignIn = () => {};

  return (
    <div className="h-[calc( 100vh - 64px)] flex items-center">
      <div className="mx-auto mb-4 w-full max-w-sm rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <h2 className="font-primary mb-4 text-xl font-semibold">
          Please Login
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
              <p className="mb-3 text-red-600">test massage{message}</p>
            </div>
          )}
          <div>
            <button className="btn-primary font-primary">Login</button>
          </div>
        </form>
        <p className="mt-4 mb-4 align-baseline text-sm font-medium">
          Don't have an account? Please{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        {/* google sign-in method*/}
        <div className="mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="font-primary flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-blue-800"
          >
            <FaGoogle />
            Sign in With Google
          </button>
        </div>
        <p className="text-center text-sm text-gray-600">
          &copy; 2022 All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
