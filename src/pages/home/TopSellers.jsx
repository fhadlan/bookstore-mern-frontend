import React from "react";

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];
const TopSellers = () => {
  const [books, setBooks] = React.useState([]);
  const [selectedCategory, setSelectedCategory] =
    React.useState("Choose a genre");

  React.useEffect(() => {
    fetch("book.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase(),
        );

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
      {filteredBooks.map((book, index) => (
        <div key={index}> {book.title}</div>
      ))}
    </div>
  );
};

export default TopSellers;
