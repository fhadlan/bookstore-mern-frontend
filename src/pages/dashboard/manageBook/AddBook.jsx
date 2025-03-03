import React from "react";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "../../../redux/features/book/bookApi";
import { Link, useOutletContext } from "react-router";
import Swal from "sweetalert2";

function AddBook() {
  const { changeTitle } = useOutletContext();
  const [createBook, { isLoading }] = useCreateBookMutation();

  React.useEffect(() => {
    changeTitle("Add Book");
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    formData.append("category", data.category);
    formData.append("trending", data.trending);
    //console.log("formData", Object.fromEntries(formData));
    try {
      await createBook(formData);
      Swal.fire({
        icon: "success",
        title: "Book added successfully",
        showConfirmButton: false,
        timer: 1500,
      }).finally(() => {
        reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Link to="/dashboard/manage-book">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200 focus:outline-none"
          >
            Manage Books
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          encType="multipart/form-data"
          className="flex w-full max-w-md flex-col rounded-lg border-gray-300 bg-white px-4 py-8 shadow-xl"
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          <label className="mb-2 font-bold">
            Title:
            <input
              type="text"
              name="title"
              className="mb-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-red-500">Title is required</p>}
          </label>

          <label className="mb-2 font-bold">
            Description:
            <textarea
              name="description"
              className="mb-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              rows="4"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">Description is required</p>
            )}
          </label>

          <label className="mb-2 font-bold">
            Category:
            <input
              type="text"
              name="category"
              className="mb-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              {...register("category", { required: true })}
            />
            {errors.category && (
              <p className="text-red-500">Category is required</p>
            )}
          </label>

          <label className="mb-2 flex items-center font-bold">
            Trending:
            <input
              type="checkbox"
              name="trending"
              className="ml-2 rounded-md border-gray-300"
              {...register("trending")}
            />
          </label>

          <label className="mt-2 mb-2 font-bold">
            Old Price:
            <input
              type="number"
              name="oldPrice"
              className="mb-2 block w-1/2 rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              {...register("oldPrice", { required: true, valueAsNumber: true })}
            />
            {errors.oldPrice && (
              <p className="text-red-500">Old Price is required</p>
            )}
          </label>
          <label className="mb-2 font-bold">
            New Price:
            <input
              type="number"
              name="newPrice"
              className="mb-2 block w-1/2 rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              {...register("newPrice", { required: true, valueAsNumber: true })}
            />
            {errors.newPrice && (
              <p className="text-red-500">New Price is required</p>
            )}
          </label>

          <label className="mb-2 font-bold">
            Cover Image:
            <input
              type="file"
              name="coverImage"
              className="mb-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
              {...register("coverImage", {
                required: "Image is required",
                validate: (fileList) => {
                  const file = fileList[0];
                  if (!file) return "Image is required";
                  if (!file.type.startsWith("image/"))
                    return "Only image files are allowed";
                  if (file.size > 1024 * 1024)
                    return "File must be less than 1MB"; // 1MB limit
                  return true;
                },
              })}
              accept="image/*"
            />
            {errors.coverImage && (
              <p className="text-red-500">Cover Image is required</p>
            )}
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none"
          >
            {isLoading ? (
              <div className="flex h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            ) : (
              "Add Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
