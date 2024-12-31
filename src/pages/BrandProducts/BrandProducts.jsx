import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function BrandProducts() {
  const { id } = useParams();

  async function getBrandDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  async function getBrandProducts() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  let { data: brandDetails } = useQuery({
    queryKey: ["brandDetails"],
    queryFn: getBrandDetails,
    staleTime: Infinity,
  });

  let {
    data: brandProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["brandProducts"],
    queryFn: getBrandProducts,
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
        <title>{`${brandDetails?.data.data.name} Products`}</title>
      </Helmet>

      <section className="px-2">
        <h2 className="text-3xl text-primary-900 my-10">
          {brandDetails?.data.data.name} Products
        </h2>

        {brandProducts?.data.data.length === 0 ? (
          <p>Oops, no products in this brand now.</p>
        ) : (
          <div className="grid gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {brandProducts?.data.data.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
