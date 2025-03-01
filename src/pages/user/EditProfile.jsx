import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

function EditProfile() {
  const user = useAuth().currentUser;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user.displayName,
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
        encType="multipart/form-data"
      >
        <label className="flex flex-col">
          Display Name
          <input
            type="text"
            placeholder="Display Name"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("displayName", {
              required: "Display name is required",
            })}
          />
          {errors.displayName && (
            <span className="text-sm text-red-500">
              {errors.displayName.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          Photo
          <input
            type="file"
            placeholder="Photo URL"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("photoURL", {
              required: "Photo URL is required",
            })}
          />
          {errors.photoURL && (
            <span className="text-sm text-red-500">
              {errors.photoURL.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="hover rounded-md bg-blue-500 p-2 text-white"
        >
          Update
        </button>
        <button
          type="button"
          className="hover rounded-md bg-gray-500 p-2 text-white"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
