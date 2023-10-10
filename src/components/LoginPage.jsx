import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import Loader from "./Loader";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); //

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true); // Set loading to true while performing login

      // Authenticate the user with Firebase
      await signInWithEmailAndPassword(auth, values.email, values.password);

      // Redirect to the homepage upon successful login
      navigate("/home"); // Change this URL to the path of your homepage

      // Display a success toast message
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login Error:", error);

      // Display an error toast message
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Set loading back to false after login attempt
    }
  };

  return (
    <div className="container">
      {loading && <Loader />} {/* Display the loader while loading */}
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <h2>Login</h2>
            <hr />
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className={
                        formik.touched.email && formik.errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <ErrorMessage name="email">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    <ErrorMessage name="password">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block"
                    disabled={!formik.isValid || loading}
                  />
                </Form>
              )}
            </Formik>

            <br />
            <p className="text-center">
              New User? <a href="/signup">Click here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
