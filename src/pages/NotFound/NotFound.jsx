import { Helmet } from "react-helmet";
import notFoundImg from "../../assets/imgs/error.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>

      <div className="h-[60vh] flex justify-center items-center">
        <img src={notFoundImg} alt="" className="h-3/4" />
      </div>
    </>
  );
}
