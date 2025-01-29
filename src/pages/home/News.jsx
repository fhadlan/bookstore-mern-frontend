import React from "react";
import { getImgUrlNews } from "../../utils/getImgUrl";
import { Swiper, SwiperSlide } from "swiper/react";

import news1 from "../../assets/news/news-1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router";

const news = [
  {
    id: 1,
    title: "Global Climate Summit Calls for Urgent Action",
    description:
      "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
    image: "news-1",
  },
  {
    id: 2,
    title: "Breakthrough in AI Technology Announced",
    description:
      "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
    image: "news-2",
  },
  {
    id: 3,
    title: "New Space Mission Aims to Explore Distant Galaxies",
    description:
      "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
    image: "news-3",
  },
  {
    id: 4,
    title: "Stock Markets Reach Record Highs Amid Economic Recovery",
    description:
      "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
    image: "news-4",
  },
  {
    id: 5,
    title: "Innovative New Smartphone Released by Leading Tech Company",
    description:
      "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
    image: "news-2",
  },
];

const News = () => {
  return (
    <div className="py-10">
      <h2 className="font-primary mb-6 text-3xl font-semibold">News</h2>
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
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-4 sm:h-48 sm:flex-row sm:items-center sm:justify-center">
              <div>
                <Link to="/">
                  <h2 className="font-primary mb-3 text-lg font-semibold hover:text-blue-600">
                    {item.title}
                  </h2>
                </Link>
                <div className="bg-primary mb-2 h-1 w-10"></div>
                <p className="font-secondary mb-5 text-sm text-gray-600">
                  {`${item.description.slice(0, 80)} ...`}
                </p>
              </div>
              <img
                src={`${getImgUrlNews(item.image)}`}
                alt={item.image}
                className="cursor-pointer rounded-md bg-cover p-2 transition-all duration-200 hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
