import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";

export default function CartItem({ productInfo }) {
  const { count, price, product, _id } = productInfo;
  const { title, category, imageCover, id } = product;
  const { removeCartItem, updateProductCount } = useContext(CartContext);

  return (
    <>
      <div className="cart-item relative grow bg-gray-200 py-4 px-6 flex flex-col md:flex-row justify-between md:items-center gap-5 rounded-lg shadow">
        <img
          src={imageCover}
          alt=""
          className="w-32 h-32 rounded-md  object-cover"
        />
        <h2 className="text-lg text-gray-700 font-semibold grow-[3] max-w-[500px] line-clamp-2">
          <Link to={`/product/${id}`}>{title}</Link>
        </h2>
        <h3 className="text-gray-500 font-semibold grow">{category.name}</h3>

        <div className="flex items-center gap-4">
          <div className="count flex items-center gap-3">
            <span>{count}</span>
            <div className="space-y-4">
              <div
                className="icon w-6 h-6 rounded-full bg-gray-800 text-white flex justify-center items-center cursor-pointer"
                onClick={() => {
                  updateProductCount({ productId: id, count: count + 1 });
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </div>
              <div
                className="icon w-6 h-6 rounded-full bg-gray-800 text-white flex justify-center items-center cursor-pointer"
                onClick={() => {
                  updateProductCount({ productId: id, count: count - 1 });
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </div>
            </div>
          </div>

          <span>{price} L.E</span>
        </div>

        <button
          className="absolute text-red-600 top-1 right-2 text-lg p-1"
          onClick={() => {
            removeCartItem({ id: id });
          }}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </>
  );
}
