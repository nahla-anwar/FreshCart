import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProvider from "./context/User.context";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import CartProvider from "./context/Cart.context";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";
import WishListProvider from "./context/WishList.context";
import WishList from "./pages/WishList/WishList";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import { Offline } from "react-detect-offline";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Products from "./pages/Products/Products";
import Brands from "./pages/Brands/Brands";
import Categories from "./pages/Categories/Categories";
import BrandProducts from "./pages/BrandProducts/BrandProducts";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <WishList /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "products", element: <Products /> },
        { path: "brands", element: <Brands /> },
        { path: "brand/:id", element: <BrandProducts /> },
        { path: "categories", element: <Categories /> },
        { path: "category/:id", element: <CategoryProducts /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verifycode", element: <VerifyCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
      ],
    },

    {
      path: "/",
      element: <Layout />,
      children: [{ path: "*", element: <NotFound /> }],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              <RouterProvider router={routes} />
            </WishListProvider>
          </CartProvider>
        </UserProvider>
        <Toaster />

        <Offline>
          <div className="min-h-screen bg-black bg-opacity-30 fixed top-0 bottom-0 left-0 right-0 z-[999]">
            <h2 className="bg-gray-200 absolute bottom-5 right-3 p-4 rounded">
              You are offline now.. Check internet connection.
            </h2>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
