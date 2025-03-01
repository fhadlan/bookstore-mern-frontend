import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useUpdateProfileMutation } from "../../redux/features/userCustomer/userApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function EditProfile() {
  const user = useAuth().currentUser;
  const getAuth = useAuth().getAuth;

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const navigate = useNavigate();

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
    const formData = new FormData();
    formData.append("uid", user.uid);
    formData.append("displayName", data.displayName);
    data.photo[0] && formData.append("photo", data.photo[0]);
    try {
      Swal.fire({
        icon: "question",
        title: "Update profile?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          updateProfile(formData);
          Swal.fire({
            icon: "success",
            title: "Profile updated successfully",
            showConfirmButton: false,
            timer: 1500,
          }).finally(async () => {
            await getAuth().currentUser.reload();
            navigate("/profile", { replace: true });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col p-4">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
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
            placeholder="Photo"
            className="rounded-md border-2 border-gray-300 p-2"
            {...register("photo", {
              validate: (fileList) => {
                if (fileList.length === 0) return true;
                if (!fileList[0].type.startsWith("image/"))
                  return "Only image files are allowed";
                if (fileList[0].size > 1024 * 1024)
                  return "File must be less than 1MB"; // 1MB limit
                return true;
              },
            })}
            accept="image/*"
          />
          {errors.photo && (
            <span className="text-sm text-red-500">{errors.photo.message}</span>
          )}
        </label>
        <button
          type="submit"
          className="hover mb-2 rounded-md bg-blue-500 p-2 text-white"
        >
          Update
        </button>
      </form>
      <button
        type="button"
        className="hover rounded-md bg-gray-500 p-2 text-white"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </div>
  );
}

export default EditProfile;
