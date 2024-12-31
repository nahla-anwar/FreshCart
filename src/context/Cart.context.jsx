import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);

  let { token } = useContext(UserContext);

  async function addProductToCart({ productId }) {
    let toastId = toast.loading("Waiting...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        getCartProducts();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getCartProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeCartItem({ id }) {
    let toastId = toast.loading("Deleteing Product...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success("Product has been deleted successfully");
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function clearCart() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo(null);
        getCartProducts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductCount({ productId, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getCartProducts,
        cartInfo,
        removeCartItem,
        clearCart,
        updateProductCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
