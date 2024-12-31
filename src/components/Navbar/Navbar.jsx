import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { WishListContext } from "../../context/WishList.context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartInfo, getCartProducts } = useContext(CartContext);
  const { wishListInfo, getWishListProducts } = useContext(WishListContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  useEffect(() => {
    getWishListProducts();
  }, []);

  return (
    <>
      <nav className="bg-slate-100 py-3 shadow-sm fixed top-0 start-0 end-0 z-30">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-12 ">
          <Link to="/">
            <img src={freshCartLogo} alt="FreshCart Logo" />
          </Link>

          <div className="flex md:order-2 gap-4">
            {token && (
              <div className="flex items-center gap-6">
                <Link to="/cart" className="cart  cursor-pointer relative">
                  <i className="fa-solid fa-cart-shopping text-lg"></i>
                  <div className="cart-counter absolute right-0 top-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 text-white flex justify-center items-center">
                    {cartInfo === null ? (
                      <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                    ) : (
                      <span>{cartInfo.numOfCartItems}</span>
                    )}
                  </div>
                </Link>

                <Link
                  to="/wishlist"
                  className="wish-list cursor-pointer relative"
                >
                  <i className="fa-solid fa-heart text-lg"></i>
                  <div className="cart-counter absolute right-0 top-0 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 text-white flex justify-center items-center">
                    {wishListInfo === null ? (
                      <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                    ) : (
                      <span>{wishListInfo.count}</span>
                    )}
                  </div>
                </Link>
              </div>
            )}

            <ul className="flex items-center gap-5">
              {!token && (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                          isActive ? "before:!w-full font-semibold" : ""
                        }`;
                      }}
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) => {
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                          isActive ? "before:!w-full font-semibold" : ""
                        }`;
                      }}
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              {token && (
                <li onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-xl cursor-pointer"></i>
                </li>
              )}
            </ul>

            {token && (
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center px-2 justify-center md:hidden"
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <i className="fa-solid fa-bars text-xl text-primary-900"></i>
              </button>
            )}
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            {token && (
              <ul className="flex flex-col px-4 gap-5 md:p-0  md:flex-row">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition[width] before:duration-300 before:left-0 before:-bottom-1 ${
                        isActive ? "before:!w-full font-semibold" : ""
                      }`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
