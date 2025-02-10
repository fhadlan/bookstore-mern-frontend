import React from "react";
import BookCard from "../books/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/book/bookApi";

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] =
    React.useState("Choose a genre");
  const [categories, setCategories] = React.useState([]);
  const { data: books = [], isLoading } = useFetchAllBooksQuery();

  React.useEffect(() => {
    if (books) {
      setCategories([
        "Choose a genre",
        ...new Set(books.map((book) => book.category)),
      ]);
      console.log("this runs");
    }
  }, [books]);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="py-10">
      <h2 className="font-primary mb-6 text-3xl font-semibold">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="rounded-sm bg-[#EAEAEA] px-2 py-1 shadow-xs focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {filteredBooks.length > 0 &&
          filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default TopSellers;
