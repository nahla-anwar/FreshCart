import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";

export default function VerifyCode() {
  const navigate = useNavigate();

  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });

  async function sendDataToVerifyCode(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.status === "Success") {
        toast.success("Code verified successfully");
        setTimeout(() => {
          navigate("/resetpassword");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },

    validationSchema,

    onSubmit: sendDataToVerifyCode,
  });

  return (
    <>
      <Helmet>
        <title>Verify Code</title>
      </Helmet>

      <section>
        <h1 className="text-xl text-slate-700 font-semibold mb-5">
          <i className="fa-regular fa-circle-user mr-2"></i> Verify Code
        </h1>

        <form className="space-y-3 px-4" onSubmit={formik.handleSubmit}>
          <div className="text">
            <input
              type="text"
              className="form-control w-full"
              placeholder="Verify Code"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="resetCode"
            />

            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="text-red-600 mt-1 text-sm">
                *{formik.errors.resetCode}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white w-full"
          >
            Send
          </button>
        </form>
      </section>
    </>
  );
}
