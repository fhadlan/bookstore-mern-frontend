import React from "react";
import { useFetchUsersQuery } from "../../../redux/features/admin/adminApi";

function ManageUsers() {
  const { data: users, isLoading } = useFetchUsersQuery();
  React.useEffect(() => {
    console.log(users);
  }, []);
  return <div>ManageUsers</div>;
}

export default ManageUsers;
