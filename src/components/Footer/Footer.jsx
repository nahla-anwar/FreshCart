import amazonPayLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";
import appStoreLogo from "../../assets/imgs/get-apple-store.png";
import googlePlayLogo from "../../assets/imgs/get-google-play.png";

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-8">
        <div className="container space-y-4 px-1">
          <header>
            <h2 className="text-xl font-semibold text-slate-800">
              Get the FreshCart app
            </h2>
            <p className="text-slate-400">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </header>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control grow"
            />
            <button className="btn uppercase bg-primary-800 hover:bg-primary-900 text-white text-sm font-semibold">
              Share App Link
            </button>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row justify-between lg:items-center py-4 border-y-2 border-slate-300 border-opacity-50">
            <div className="payment-partners flex flex-col md:flex-row md:items-center gap-2">
              <h3 className="">Payment Partners</h3>

              <div className="flex flex-wrap items-center gap-2">
                <img
                  className=" w-24"
                  src={amazonPayLogo}
                  alt="amazone pay logo"
                />
                <img
                  className=" w-24"
                  src={americanExpressLogo}
                  alt="american express logo"
                />
                <img
                  className=" w-20"
                  src={masterCardLogo}
                  alt="master card logo"
                />
                <img className=" w-24" src={paypalLogo} alt="paypal logo" />
              </div>
            </div>

            <div className="download flex flex-col md:flex-row md:items-center gap-3">
              <h3>Get deliveries with FreshCart</h3>
              <div className="flex items-center gap-2">
                <img className="w-24" src={appStoreLogo} alt="app store logo" />
                <img
                  className="w-[110px]"
                  src={googlePlayLogo}
                  alt="google play logo"
                />
              </div>
            </div>
          </div>

          <ul
            className={`flex items-center gap-5 mt-4 px-4 lg:mt-0 lg:px-0 justify-center 
                
              `}
          >
            <li>
              <a href="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
