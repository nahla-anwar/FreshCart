import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { WishListContext } from "../../context/WishList.context";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  const {
    title,
    description,
    price,
    priceAfterDiscount,
    imageCover,
    category,
    ratingsAverage,
    id,
  } = productInfo;

  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList } = useContext(WishListContext);

  return (
    <>
      <div className="relative card group/card shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="card-image relative">
          <img src={imageCover} alt={title} />

          <div className="layer absolute w-full h-full left-0 top-0 bg-slate-500 bg-opacity-30 flex justify-center items-center gap-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
            <div
              className="icon group/icon w-8 h-8 rounded-full bg-primary-900 text-white flex justify-center items-center cursor-pointer"
              onClick={() => {
                addProductToWishList({ productId: id });
              }}
            >
              <i className="fa-solid fa-heart group-hover/icon:-rotate-12 transition-transform duration-300"></i>
            </div>

            <div
              className="icon group/icon w-8 h-8 rounded-full bg-primary-900 text-white flex justify-center items-center cursor-pointer"
              onClick={() => {
                addProductToCart({ productId: id });
              }}
            >
              <i className="fa-solid fa-cart-shopping group-hover/icon:-rotate-12 transition-transform duration-300"></i>
            </div>

            <Link
              to={`/product/${id}`}
              className="icon group/icon w-8 h-8 rounded-full bg-primary-900 text-white flex justify-center items-center cursor-pointer"
            >
              <i className="fa-solid fa-eye group-hover/icon:-rotate-12 transition-transform duration-300"></i>
            </Link>
          </div>
        </div>
        <div className="card-body p-4 space-y-3">
          <header>
            <h3 className="text-lg text-gray-600 font-semibold line-clamp-2">
              {title}
            </h3>
            <h4 className="text-primary-800 font-semibold">{category.name}</h4>
          </header>
          <p className="text-sm line-clamp-3 text-gray-500">{description}</p>

          <div className="flex justify-between items-center">
            {priceAfterDiscount ? (
              <div className="flex flex-col">
                <span className="text-sm line-through text-red-400">
                  {price} L.E
                </span>
                <span>{priceAfterDiscount} L.E</span>
              </div>
            ) : (
              <span>{price} L.E</span>
            )}
            <div>
              <i className="fa-solid fa-star mr-2 text-yellow-500"></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
        </div>
        {priceAfterDiscount ? (
          <div className="absolute top-0 bg-red-600 w-fit text-white p-1">
            Sale
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
