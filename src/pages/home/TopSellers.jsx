import React from "react";

const TopSellers = () => {
  const [book, setBook] = React.useState([]);

  React.useEffect(() => {
    fetch("book.json")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>TopSellers</div>;
};

export default TopSellers;
