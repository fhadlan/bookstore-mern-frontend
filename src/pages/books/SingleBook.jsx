import React from "react";

import { useParams } from "react-router";
import { useFetchSingleBookQuery } from "../../redux/features/book/bookApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";
import { getImgUrl } from "../../utils/getImgUrl";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchSingleBookQuery(id);
  //console.log(book);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      <div className="mx-auto mb-4 w-full max-w-5xl rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <h3 className="font-primary mb-6 text-xl font-semibold">
          {book?.title}
        </h3>
        <div className="flex gap-4">
          <div className="flex flex-shrink-0 flex-col items-center">
            <img
              src={book?.coverImage}
              alt=""
              className="cursor-pointer rounded-md bg-cover"
            />
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-primary hover:bg-secondary mt-2 flex w-full items-center justify-center gap-1 space-x-1 rounded-md px-3 py-1 shadow-sm transition-all duration-200 hover:cursor-pointer hover:text-white"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <span>
              <strong>Author:</strong> static author
            </span>
            <span>
              <strong>Category:</strong> {book?.category}
            </span>
            <span>
              <strong>Description:</strong> {book?.description}
            </span>
            <span>
              <strong>Price:</strong> {book?.newPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
