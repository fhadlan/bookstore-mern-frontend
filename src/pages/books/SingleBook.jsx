import React from "react";

import { useParams } from "react-router";
import { useFetchSingleBookQuery } from "../../redux/features/book/bookApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchSingleBookQuery(id);
  const [quantity, setQuantity] = React.useState(1);
  //console.log(book);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <div className="mx-auto mb-4 w-full max-w-5xl rounded bg-white px-8 pt-6 pb-8 shadow-md">
        <h3 className="font-primary mb-6 text-xl font-semibold">
          {book?.title}
        </h3>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-shrink-0 flex-col items-center">
            <img
              src={book?.coverImage}
              alt=""
              className="cursor-pointer rounded-md bg-cover"
            />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex flex-grow flex-col gap-3">
              <span>
                <strong>Author:</strong> {book?.author}
              </span>
              <span>
                <strong>Category:</strong> {book?.category}
              </span>
              <span>
                <strong>Description:</strong> {book?.description}
              </span>
              <span>
                <strong>Price:</strong>{" "}
                {book?.discountedPrice.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}{" "}
                {book?.discountedPrice !== book?.price && (
                  <span className="line-through">
                    {book?.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                )}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-grow items-end justify-end">
                <p
                  className={`text-md ${book?.quantity > 0 ? "text-gray-500" : "text-red-600"}`}
                >
                  {book?.quantity > 0
                    ? `In Stock: ${book.quantity}`
                    : "Out of Stock"}
                </p>
              </div>
              <div className="flex flex-row justify-end">
                <label className="px-2 py-1">
                  Quantity:
                  <select
                    className="ml-1 rounded-md px-2 py-1"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(book?.quantity).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>

                <button
                  onClick={() =>
                    handleAddToCart({
                      _id: book?._id,
                      quantity,
                    })
                  }
                  className="bg-primary hover:bg-secondary flex items-center justify-center gap-1 space-x-1 rounded-md px-3 py-1 shadow-sm transition-all duration-200 hover:cursor-pointer hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                  disabled={book?.quantity === 0}
                >
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
