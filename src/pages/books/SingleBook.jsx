import React from "react";

import { Link, useParams } from "react-router";
import { useFetchSingleBookQuery } from "../../redux/features/book/bookApi";
const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchSingleBookQuery(id);
  console.log(book);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      SingleBook
    </div>
  );
};

export default SingleBook;
