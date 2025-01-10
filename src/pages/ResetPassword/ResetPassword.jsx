import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const [incorrectError, setIncorrectError] = useState(null);

  const [passType, setPassType] = useState("password");
  const [passIcon, setPassIcon] = useState("fa-eye");

  function showPassword() {
    if (passType === "password" && passIcon === "fa-eye") {
      setPassType("text");
      setPassIcon("fa-eye-slash");
    } else {
      setPassType("password");
      setPassIcon("fa-eye");
    }
  }

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),

    newPassword: string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Password should be at least eight characters, one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };

      let { data } = await axios.request(options);

      toast.success("Done");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      setIncorrectError(error.response.data.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },

    validationSchema,

    onSubmit: sendDataToLogin,
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <section>
        <h1 className="text-xl text-slate-700 font-semibold mb-5">
          <i className="fa-regular fa-circle-user mr-2"></i> Reset Password
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

          <div className="password">
            <div className="relative">
              <input
                type={passType}
                className="form-control w-full"
                placeholder="New Password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="newPassword"
              />
              <i
                className={`fa-regular ${passIcon} cursor-pointer text-gray-600 absolute right-3 top-1/2 -translate-y-1/2`}
                onClick={() => {
                  showPassword();
                }}
              ></i>
            </div>

            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-600 mt-1 text-sm">
                *{formik.errors.newPassword}
              </p>
            )}

            {incorrectError && (
              <p className="text-red-600 mt-1 text-sm">*{incorrectError}</p>
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
