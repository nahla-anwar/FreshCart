import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 mb-8">
        <div className="col-span-12 md:col-span-8">
          <Swiper loop={true} className="h-full">
            <SwiperSlide className="h-full">
              <img
                src={sliderImage3}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full">
              <img
                src={sliderImage1}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full">
              <img
                src={sliderImage2}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex md:flex-col col-span-12 md:col-span-4">
          <img src={sliderImage1} alt="" className="w-1/2 md:w-full h-full" />
          <img src={sliderImage2} alt="" className="w-1/2 md:w-full h-full" />
        </div>
      </section>
    </>
  );
}
