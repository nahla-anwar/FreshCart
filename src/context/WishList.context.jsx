import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const [wishListInfo, setWishListInfo] = useState(null);

  let { token } = useContext(UserContext);

  async function addProductToWishList({ productId }) {
    let toastId = toast.loading("Waiting...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
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
        toast.success(data.message);
        getWishListProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishListProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);

      if (data.status === "success") {
        setWishListInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeWishListItem({ id }) {
    let toastId = toast.loading("Deleteing Product...");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };

      let { data } = await axios.request(options);
      if (data.status === "success") {
        toast.success(data.message);
        getWishListProducts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getWishListProducts,
        wishListInfo,
        removeWishListItem,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
