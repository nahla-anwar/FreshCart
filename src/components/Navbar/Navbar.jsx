import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context";
import { CartContext } from "../../context/Cart.context";
import { WishListContext } from "../../context/WishList.context";
import { Button, Navbar } from "flowbite-react";

export default function NavComponent() {
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
    <Navbar
      rounded
      className="bg-slate-100 shadow-sm fixed top-0 start-0 end-0 z-30"
    >
      <Link to="/">
        <img
          src={freshCartLogo}
          className="mr-3 h-6 sm:h-9"
          alt="FreshCart Logo"
        />
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

            <Link to="/wishlist" className="wish-list cursor-pointer relative">
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

        {token && <Navbar.Toggle />}
      </div>

      {token && (
        <Navbar.Collapse>
          <ul className="flex flex-col md:flex-row gap-1 md:gap-6">
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
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
