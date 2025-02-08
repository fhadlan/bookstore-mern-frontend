import React from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useFetchSingleBookQuery } from "../../../redux/features/book/bookApi";
import getBaseUrl from "../../../utils/getBaseUrl";

function EditBook() {
  const { id } = useParams();
  const { data: book = [], isLoading } = useFetchSingleBookQuery(id);
  const [preview, setPreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("description", book.description);
      setValue("coverImage", book.coverImage);
      setValue("oldPrice", book.oldPrice);
      setValue("newPrice", book.newPrice);
      setValue("category", book.category);
      setValue("trending", book.trending);
      setPreview(getBaseUrl() + "/" + book.coverImage);
    }
    console.log(book.coverImage);
  }, [book]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("coverImage", data.coverImage[0]);
    formData.append("oldPrice", data.oldPrice);
    formData.append("newPrice", data.newPrice);
    formData.append("category", data.category);
    formData.append("trending", data.trending);
    console.log("formData", Object.fromEntries(formData));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show preview of new file
    }
  };

  return (
    <div className="flex items-center justify-center">
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

        <div className="mb-2 flex h-40 items-start">
          <div className="mr-2 flex flex-col">
            <label className="mb-2 font-bold">
              Cover Image:
              <br />
              <input
                type="file"
                name="coverImage"
                className="mt-8 mb-2 w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-200 focus:outline-none"
                {...register("coverImage", { required: true })}
                onChange={handleFileChange}
              />
              {errors.coverImage && (
                <p className="text-red-500">Cover Image is required</p>
              )}
            </label>
          </div>
          <div className="w-1/3">
            {preview && (
              <img src={preview} alt="cover image" className="object-contain" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-100 focus:outline-none"
        >
          {isLoading ? (
            <div className="flex h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          ) : (
            "Update Book"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditBook;
