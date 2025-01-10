import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod === "cash") {
        handleCashOrder();
      } else {
        handlaOnlinePayment();
      }
    },
  });

  async function handleCashOrder(values) {
    let toastId = toast.loading("Making an order...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Order has been created successfully");
        setTimeout(() => {
          navigate("/allOrders");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handlaOnlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.loading("Redirecting you to stripe...");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <section>
        <h1 className="text-xl text-gray-700 mb-4 font-semibold">
          Shipping Address
        </h1>
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              placeholder="City"
              className="form-control w-full"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              name="shippingAddress.city"
            />
          </div>

          <div className="phone">
            <input
              type="tel"
              placeholder="Phone"
              className="form-control w-full"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              name="shippingAddress.phone"
            />
          </div>

          <div className="details">
            <textarea
              placeholder="Details"
              className="form-control w-full"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => {
              setPaymentMethod("cash");
            }}
          >
            Cash Order
          </button>
          <button
            type="submit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white ml-2"
            onClick={() => {
              setPaymentMethod("online");
            }}
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
