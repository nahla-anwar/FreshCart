import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishListContext } from "../../context/WishList.context";

export default function WishListItem({ productInfo }) {
  const { addProductToCart } = useContext(CartContext);
  const { removeWishListItem } = useContext(WishListContext);
  const { imageCover, title, category, price, id } = productInfo;

  return (
    <>
      <div className="flex gap-3">
        <div className="wishlist-item grow bg-gray-100 py-4 px-10 flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-14 rounded-lg shadow">
          <img
            src={imageCover}
            alt=""
            className="w-32 h-32 rounded-md object-cover"
          />
          <div className="grow flex flex-col gap-3">
            <h2 className="text-lg md:text-2xl text-gray-800 grow-[3] max-w-[500px] line-clamp-2">
              {title}
            </h2>
            <h3 className="text-primary-600 grow">{category.name}</h3>

            <span>{price} L.E</span>

            <div className="flex justify-between gap-3">
              <button
                className="btn w-fit border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-colors duration-300"
                onClick={() => {
                  removeWishListItem({ id });
                }}
              >
                Remove
              </button>
              <button
                className="btn w-fit border-2 border-primary-700 text-primary-700 bg-transparent hover:bg-primary-700 hover:text-white transition-colors duration-300 "
                onClick={() => {
                  addProductToCart({ productId: id });
                  removeWishListItem({ id });
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
