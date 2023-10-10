import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { auth, fireDB } from "../firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const SignupPage = () => {
  const [loading, setLoading] = useState(false); // Add loading state

  const initialValues = {
    firstName: "",
    email: "",
    mobile: "",
    password: "",
  };

  // const onSubmit = (values) => {
  //   console.log(values);
  // };

  const onSubmit = async (values, formikBag) => {
    try {
      setLoading(true); // Set loading to true while performing the signup

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Access the user information from the user credential
      const user = userCredential.user;

      console.log("User created:", user);

      // Extract relevant user data
      const userData = {
        firstName: values.firstName,
        uid: user.uid,
        email: user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "Allusers");
      await addDoc(userRef, userData);

      // Display a success toast message
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 5000, //
      });

      formikBag.resetForm();
      // Clear the form fields after a successful signup

      setLoading(false); // Set loading back to false after the signup is complete
    } catch (error) {
      console.error("Error:", error);

      setLoading(false); // Set loading back to false if there is an error
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("first name is required"),
    email: Yup.string()
      .required("email is required")
      .email("email must be valid email"),
    mobile: Yup.string().required("mobile is required"),
    password: Yup.string()
      .required("password is required")
      .min(6, "password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="container">
      {loading && <Loader />} {/* Display the loader while loading */}
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <h2>Sign Up</h2>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <small className="text-danger">
                    {formik.errors.firstName}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  className={
                    formik.touched.mobile && formik.errors.mobile
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <small className="text-danger">{formik.errors.mobile}</small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>
              <input
                type="submit"
                value="Signup"
                className="btn btn-primary btn-block"
                disabled={!formik.isValid}
              />
            </form>
            <br />
            <p className="text-center">
              Already Registered? <a href="/login">Click Here</a>
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default SignupPage;
