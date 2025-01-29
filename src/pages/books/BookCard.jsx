import React from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { getImgUrl } from "../../utils/getImgUrl";

const BookCard = ({ book }) => {
  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center sm:justify-center">
        <div className="rounded-md shadow-sm sm:h-72 sm:flex-shrink-0">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt=""
              className="w-full cursor-pointer rounded-md bg-cover p-2 transition-all duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="font-primary mb-3 text-lg font-semibold hover:text-blue-600">
              {book.title}
            </h3>
          </Link>
          <p className="font-secondary mb-5 text-sm text-gray-600">
            {book.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book.description}
          </p>
          <p className="mb-5 font-medium">
            ${book.newPrice}{" "}
            <span className="ml-2 font-normal line-through">
              ${book.oldPrice}
            </span>
          </p>
          <button className="bg-primary hover:bg-secondary flex items-center gap-1 space-x-1 rounded-md px-3 py-1 shadow-sm transition-all duration-200 hover:cursor-pointer hover:text-white">
            <FaShoppingCart className="" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
