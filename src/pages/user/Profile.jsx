import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

function Profile() {
  const user = useAuth().currentUser;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded p-4 shadow-2xl">
      <img
        src={user?.photoURL}
        loading="lazy"
        referrerPolicy="no-referrer"
        alt="avatar"
        className="size-32 rounded-full shadow"
      />
      <h1 className="mt-4 text-2xl font-bold">{user?.displayName}</h1>
      <Link
        to={"/edit-profile"}
        className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default Profile;
