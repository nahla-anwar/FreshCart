import { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WishList.context";
import Loading from "../../components/Loading/Loading";
import WishListItem from "../../components/WishListItem/WishListItem";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { getWishListProducts, wishListInfo } = useContext(WishListContext);

  useEffect(() => {
    getWishListProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>

      {wishListInfo === null ? (
        <Loading />
      ) : (
        <section>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-wand-sparkles text-3xl"></i>
            <h1 className="text-gray-800 text-xl font-semibold pl-4">
              Your WishList
            </h1>
          </div>

          {wishListInfo.count === 0 ? (
            <div className="p-5 bg-gray-100 flex justify-center items-center flex-col gap-5 rounded-md mt-5">
              <h2>
                Your WishList is empty. Select what you want by clicking the
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
            <div className="space-y-4 mt-6">
              {wishListInfo.data.map((product) => (
                <WishListItem key={product.id} productInfo={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}
