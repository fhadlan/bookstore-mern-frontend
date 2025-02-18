import React from "react";

import bannerImg from "../../assets/banner.png";
import { useFetchBannerImageQuery } from "../../redux/features/book/bookApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./swiper.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

const Banner = () => {
  const { data: banner, isLoading } = useFetchBannerImageQuery();
  React.useEffect(() => {
    console.log(banner);
  }, [banner]);
  return (
    <div className="flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse">
      <div className="flex w-full items-center md:w-1/2 md:justify-end">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={1}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {!isLoading && banner ? (
            banner.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.coverImage} alt="" />
              </SwiperSlide>
            ))
          ) : (
            <div className="loader"></div>
          )}
        </Swiper>
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
