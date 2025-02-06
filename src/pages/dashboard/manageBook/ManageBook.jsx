import React from "react";
import {
  useDeleteBookMutation,
  useFetchAllBooksQuery,
} from "../../../redux/features/book/bookApi";
import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
function ManageBook() {
  const { data: books = [], isLoading } = useFetchAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteBook(id).then(() => {
            Swal.fire({
              icon: "success",
              title: "Book deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    console.log(isLoading);
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      ManageBook
      <table className="table-auto border-collapse border border-slate-300 shadow-2xl">
        <thead>
          <tr className="bg-slate-300">
            <th className="px-4 py-2">Book title</th>
            <th className="px-4 py-2">Author</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className={`hover:bg-slate-200 ${
                index % 2 === 1 ? "bg-slate-100" : "bg-white"
              } text-sm`}
            >
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">static</td>
              <td className="px-4 py-2">{book.category}</td>
              <td className="px-4 py-2">{book.newPrice}</td>
              <td className="flex items-center justify-center gap-1 px-4 py-2">
                <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-blue-700">
                  <FaPen />
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:cursor-pointer hover:bg-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBook;
