import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };

    return axios(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
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
        <title>Brands</title>
      </Helmet>

      <section>
        <h2 className="text-3xl text-primary-900 my-10">Brands</h2>
        <div className="grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.data.data.map((brand) => (
            <Link
              key={brand._id}
              to={`/brand/${brand._id}`}
              className="text-center shadow-md shadow-primary-100 rounded-md py-2 hover:scale-105 transition-transform duration-500"
            >
              <img src={brand.image} className="w-full" alt={brand.name} />
              <h3>{brand.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
