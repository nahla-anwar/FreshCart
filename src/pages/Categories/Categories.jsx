import axios from "axios";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  async function getCategories() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return axios(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
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
        <title>Categories</title>
      </Helmet>

      <section>
        <h2 className="text-3xl text-primary-900 my-10">Categories</h2>

        <div className="grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data?.data.data.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="text-center shadow-md shadow-primary-100 rounded-md py-2 hover:scale-105 transition-transform duration-500"
            >
              <img
                src={category.image}
                className="w-full h-72 object-cover"
                alt={category.name}
              />
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
