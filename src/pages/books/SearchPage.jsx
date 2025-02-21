import React from "react";
import { useSearchBookQuery } from "../../redux/features/book/bookApi";
import { useSearchParams } from "react-router";
import BookCard from "./BookCard";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = React.useState(1);
  const title = searchParams.get("title");
  const { data: { books, totalPages } = [], isLoading } = useSearchBookQuery({
    title: title,
    page: currentPage,
  });

  if (isLoading) {
    return <div className="loader"></div>;
  }
  return (
    <div>
      <h2 className="font-primary mb-6 text-3xl font-semibold">
        Search Result
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {[
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
          ]
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-white"
                } rounded-lg px-4 py-2 hover:bg-blue-400 hover:text-white`}
              >
                {page}
              </button>
            ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
