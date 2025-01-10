import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";
import { jwtDecode } from "jwt-decode";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Orders() {
  const { token } = useContext(UserContext);
  let { id } = jwtDecode(token);

  async function getUserOrders() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };

    return axios.request(options);
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["userOrders"],
    queryFn: getUserOrders,
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
        <title>Orders</title>
      </Helmet>

      <section className="space-y-3">
        {data?.data.map((order) => (
          <div
            key={order.id}
            className="order border-2 border-gray-400 border-opacity-30 p-4 rounded-lg"
          >
            <header className="flex flex-col-reverse gap-2 lg:flex-row  justify-between items-center">
              <div>
                <h2 className="">Order ID</h2>
                <span className="font-bold text-lg text-primary-800">
                  #{order.id}
                </span>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="bg-lime-400 text-white font-semibold px-3  rounded-full font-cairo ms-3">
                    تم الاستلام
                  </span>
                ) : (
                  <span className="bg-blue-500 text-white font-semibold px-3  rounded-full font-cairo ms-3">
                    قيد التوصيل
                  </span>
                )}

                {order.isPaid ? (
                  <span className="bg-lime-400 text-white font-semibold px-3  rounded-full font-cairo">
                    تم الدفع
                  </span>
                ) : (
                  <span className="bg-red-500 text-white font-semibold px-3  rounded-full font-cairo">
                    غير مدفوع
                  </span>
                )}
              </div>
            </header>

            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4">
              {order.cartItems.map((item) => (
                <div
                  key={item._id}
                  className="order-item border-2 border-gray-400 border-opacity-30 rounded-lg p-3"
                >
                  <img src={item.product.imageCover} alt="" />
                  <h3 className="text-lg font-semibold">
                    {item.product.title}
                  </h3>
                  <p>Count : {item.count}</p>
                  <span>{item.price} L.E</span>
                </div>
              ))}
            </div>

            <p className="font-semibold mt-3">
              Total Order Price :{" "}
              <span className="text-primary-700">{order.totalOrderPrice}</span>{" "}
              L.E
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
