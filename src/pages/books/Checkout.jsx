import React from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isChecked, setIsChecked] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="container mx-auto max-w-screen-lg">
        <div>
          <div>
            <h2 className="mb-2 text-xl font-semibold text-gray-600">
              Cash On Delivery
            </h2>
            <p className="mb-2 text-gray-500">
              Total Price: $
              {cartItems.reduce((acc, item) => acc + item.newPrice, 0)}
            </p>
            <p className="mb-6 text-gray-500">Items: {cartItems.length}</p>
          </div>

          <div className="mb-6 rounded bg-white p-4 px-4 shadow-lg md:p-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-8 grid grid-cols-1 gap-4 gap-y-2 text-sm lg:grid-cols-3"
            >
              <div className="text-gray-600">
                <p className="text-lg font-medium">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 gap-4 gap-y-2 text-sm md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      {...register("name", { required: true })}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label html="email">Email Address</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      defaultValue=""
                      placeholder="email@domain.com"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div className="md:col-span-5">
                    <label html="phone">Phone Number</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      placeholder="+123 456 7890"
                      {...register("phone", { required: true })}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      placeholder=""
                      {...register("address", { required: true })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="mt-1 h-10 w-full rounded border bg-gray-50 px-4"
                      placeholder=""
                      {...register("city", { required: true })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / region</label>
                    <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                      <input
                        name="country"
                        id="country"
                        placeholder="Country"
                        className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
                        {...register("country", { required: true })}
                      />
                      <button
                        tabIndex="-1"
                        className="cursor-pointer text-gray-300 transition-all outline-none hover:text-red-600 focus:outline-none"
                      >
                        <svg
                          className="mx-2 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        tabIndex="-1"
                        className="cursor-pointer border-l border-gray-200 text-gray-300 transition-all outline-none hover:text-blue-600 focus:outline-none"
                      >
                        <svg
                          className="mx-2 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="mt-1 flex h-10 items-center rounded border border-gray-200 bg-gray-50">
                      <input
                        name="state"
                        id="state"
                        placeholder="State"
                        className="w-full appearance-none bg-transparent px-4 text-gray-800 outline-none"
                        {...register("state", { required: true })}
                      />
                      <button className="cursor-pointer text-gray-300 transition-all outline-none hover:text-red-600 focus:outline-none">
                        <svg
                          className="mx-2 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      <button
                        tabIndex="-1"
                        className="cursor-pointer border-l border-gray-200 text-gray-300 transition-all outline-none hover:text-blue-600 focus:outline-none"
                      >
                        <svg
                          className="mx-2 h-4 w-4 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      className="mt-1 flex h-10 w-full items-center rounded border bg-gray-50 px-4 transition-all"
                      placeholder=""
                      {...register("zipcode", { required: true })}
                    />
                  </div>

                  <div className="mt-3 md:col-span-5">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name="billing_same"
                        id="billing_same"
                        className="form-checkbox"
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I am aggree to the{" "}
                        <Link className="text-blue-600 underline underline-offset-2">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="text-blue-600 underline underline-offset-2">
                          Shoping Policy.
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="text-right md:col-span-5">
                    <div className="inline-flex items-end">
                      <button
                        disabled={!isChecked}
                        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                      >
                        Place an Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
