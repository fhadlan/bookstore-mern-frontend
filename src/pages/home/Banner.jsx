import React from "react";

import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse">
      <div className="flex w-full items-center md:w-1/2 md:justify-end">
        <img src={bannerImg} alt="" />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="font-primary mb-7 text-2xl font-medium md:text-5xl">
          New Release This Week
        </h1>
        <p className="mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In egestas
          interdum pellentesque. Vivamus vitae lacus fermentum, elementum nisl
          at, laoreet ex. Nunc commodo posuere leo at dapibus. Nunc congue
          varius luctus. Duis eu lobortis nulla. Nunc pharetra nunc vel tortor
          consequat sollicitudin. Proin fringilla nisl nec risus iaculis
          ultrices.
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
    </div>
  );
};

export default Banner;
