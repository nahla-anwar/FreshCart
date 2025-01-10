import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Card from "../../components/Card/Card";
import axios from "axios";
import HomeSlider from "../../components/HomeSlider/HomeSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

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
      <Helmet>
        <title>Home</title>
      </Helmet>

      <HomeSlider />
      <CategorySlider />

      <input
        type="search"
        className="form-control w-full mb-8 p-2 shadow-sm shadow-primary-200"
        placeholder="Search by title or category"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      ></input>

      <div className="grid gap-2 md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {searchValue === ""
          ? data?.data.data.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))
          : data?.data.data
              .filter(
                (product) =>
                  product.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  product.category.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((filteredProduct) => (
                <Card key={filteredProduct.id} productInfo={filteredProduct} />
              ))}
      </div>
    </>
  );
}
