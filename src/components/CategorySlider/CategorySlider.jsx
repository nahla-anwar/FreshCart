import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 60 * 60 * 1000,
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <p className="my-12 text-3xl">
        Oops! Something went wrong. Please try again later.
      </p>
    );
  }

  return (
    <>
      <h2 className="text-primary-950 font-semibold text-xl mb-6">
        Shop Popular Categories
      </h2>

      <Swiper
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 3,
          },
          865: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 5,
          },
          1500: {
            slidesPerView: 6,
          },
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="mb-12"
      >
        {data?.data.data.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="h-60">
              <img
                src={category.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h3>{category.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
