import React from "react";
import { useGetUsersQuery } from "../../../redux/features/admin/adminApi";

function ManageUsers() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: { users, totalPages } = {}, isLoading } = useGetUsersQuery({
    page: currentPage,
    search: "",
  });
  React.useEffect(() => {
    console.log(users, totalPages);
  }, [users]);
  return <div>ManageUsers</div>;
}

export default ManageUsers;
