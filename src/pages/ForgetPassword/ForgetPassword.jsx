import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
  });

  async function sendDataToResetPassword(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);

      if (data.statusMsg === "success") {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/verifycode");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema,

    onSubmit: sendDataToResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <section>
        <h1 className="text-xl text-slate-700 font-semibold mb-5">
          <i className="fa-regular fa-circle-user mr-2"></i> Forget Password
        </h1>

        <form className="space-y-3 px-4" onSubmit={formik.handleSubmit}>
          <div className="email">
            <input
              type="email"
              className="form-control w-full"
              placeholder="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="email"
            />

            {formik.errors.email && formik.touched.email && (
              <p className="text-red-600 mt-1 text-sm">
                *{formik.errors.email}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white w-full"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
