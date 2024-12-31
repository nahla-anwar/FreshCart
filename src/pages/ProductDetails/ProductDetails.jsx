import axios from "axios";
import { useContext } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import ReactImageGallery from "react-image-gallery";
import Card from "../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);

  async function getProductDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  let {
    data: productDetails,
    isLoading: detailsLoading,
    isError: detailsError,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
    staleTime: 6 * 60 * 60 * 1000,
  });

  const categoryId = productDetails?.data.data.category._id;

  async function getRelatedProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
      method: "GET",
    };

    return axios.request(options);
  }

  let {
    data: relatedProducts,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useQuery({
    queryKey: ["relatedProducts", categoryId],
    queryFn: getRelatedProducts,
    staleTime: 6 * 60 * 60 * 1000,
    enabled: !!categoryId,
  });

  if (detailsLoading || relatedLoading) return <Loading />;

  if (detailsError || relatedError) {
    return (
      <p className="my-12 text-3xl">
        Oops! Something went wrong. Please try again later.
      </p>
    );
  }

  return (
    <>
      <Helmet>
        <title>{productDetails?.data.data.title}</title>
      </Helmet>

      <section className="grid grid-cols-4 gap-12">
        <div className="col-span-4 lg:col-span-1">
          <ReactImageGallery
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
            items={productDetails?.data.data.images.map((image) => {
              return {
                original: image,
                thumbnail: image,
              };
            })}
          />
        </div>
        <div className="col-span-4 lg:col-span-3 space-y-4">
          <div>
            <h2 className="text-2xl text-gray-800">
              {productDetails?.data.data.title}{" "}
            </h2>
            <h3 className="text-primary-600">
              {productDetails?.data.data.category.name}
            </h3>
          </div>
          <p className="text-gray-400">
            {productDetails?.data.data.description}
          </p>
          <h3 className="text-2xl italic text-gray-700">
            {productDetails?.data.data.brand.name}
          </h3>
          <div className="flex justify-between items-center">
            <span>{productDetails?.data.data.price} L.E</span>
            <div className="space-x-2">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span>{productDetails?.data.data.ratingsAverage}</span>
            </div>
          </div>

          <button
            className="btn bg-primary-800 w-full hover:bg-primary-900 text-white transition-colors duration-300"
            onClick={() => {
              addProductToCart({ productId: id });
            }}
          >
            Add to cart
          </button>
        </div>
      </section>

      <section className="px-2">
        <h2 className="text-2xl text-gray-600 my-10">Related Products</h2>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
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
            1200: {
              slidesPerView: 5,
            },
            1500: {
              slidesPerView: 6,
            },
          }}
          spaceBetween={15}
        >
          {relatedProducts?.data.data.map((product) => (
            <SwiperSlide key={product.id}>
              <Card productInfo={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}
