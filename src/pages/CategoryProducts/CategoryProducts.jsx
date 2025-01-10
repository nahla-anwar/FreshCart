import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function CategoryProducts() {
  const { id } = useParams();

  async function getCategoryDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  async function getCategoryProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  let { data: categoryDetails } = useQuery({
    queryKey: ["categoryDetails"],
    queryFn: getCategoryDetails,
    staleTime: Infinity,
  });

  let {
    data: categoryProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categoryProducts"],
    queryFn: getCategoryProducts,
    staleTime: 6 * 60 * 60 * 1000,
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
      <Helmet>
        <title>{categoryDetails?.data.data.name}</title>
      </Helmet>

      <section className="px-2">
        <h2 className="text-3xl text-primary-900 my-10">
          {categoryDetails?.data.data.name}
        </h2>

        {categoryProducts?.data.data.length === 0 ? (
          <p>Oops, no products in this category now.</p>
        ) : (
          <div className="grid gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {categoryProducts?.data.data.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
