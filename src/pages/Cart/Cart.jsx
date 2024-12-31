import { useContext, useEffect } from "react";
import { CartContext } from "../../context/Cart.context";
import Loading from "../../components/Loading/Loading";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { getCartProducts, cartInfo, clearCart } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center gap-3">
            <i className="fa-brands fa-opencart text-3xl"></i>
            <h1 className="text-slate-700 text-xl font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 pl-4 ml-4">
              Your Shopping Cart
            </h1>
          </div>

          {cartInfo.numOfCartItems === 0 ? (
            <div className="p-5 bg-gray-100 flex justify-center items-center flex-col gap-5 rounded-md mt-5">
              <h2>
                Oops! Your cart is empty. Start shopping now by clicking the
                button below and find something you love!
              </h2>
              <Link
                to="/"
                className="btn bg-primary-800 hover:bg-primary-900 text-white"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 mt-4">
                {cartInfo.data.products.map((product) => (
                  <CartItem key={product._id} productInfo={product} />
                ))}
              </div>
              <div className="mt-5 flex justify-between items-center">
                <p className="text-lg text-gray-600 font-semibold">
                  <i className="fa-solid fa-dollar-sign text-primary-800 text-lg mr-2"></i>
                  Your total cart price is : {cartInfo.data.totalCartPrice} L.E
                </p>
                <button
                  className="btn border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition-colors duration-300"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <Link
                to="/checkout"
                className="btn bg-primary-700 hover:bg-primary-900 text-white text-center font-semibold block w-full mt-4"
              >
                Next Step
              </Link>
            </>
          )}
        </section>
      )}
    </>
  );
}
