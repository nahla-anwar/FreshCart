import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };

    return axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
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
        <title>Products</title>
      </Helmet>

      <section>
        <h2 className="text-3xl text-primary-900 my-10">Products</h2>

        <div className="grid gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data?.data.data.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      </section>
    </>
  );
}
