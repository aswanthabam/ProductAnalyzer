import { Formik, Form, Field } from "formik";
import styles from "../CommonStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { register } from "../services/api";
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";
type RegisterForm = {
  full_name: string;
  email: string;
  password: string;
};

const Register = () => {
  const redirect = useNavigate();
  const showToast = useToast().showToast;
  const [loading, setLoading] = useState(false);
  const initialValues = {
    full_name: "",
    email: "",
    password: "",
  };

  const registerSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const submitHandler = (values: RegisterForm) => {
    setLoading(true);
    register(values.full_name, values.email, values.password)
      .then((res) => {
        if (res.status === "success") {
          localStorage.setItem("accessToken", res.data.access_token);
          redirect("/register/confirm-email");
          showToast("Registered successfully. Please verify your email", 3000);
        } else {
          showToast(res.message, 5000);
        }
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
        showToast("An error occurred. Please try again later", 5000);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>We're Glad to Have You Here!</h1>
        <p>
          Registering is quick and easy. Just fill in your basic details, verify
          your email, and you're all set! 🚀
        </p>
      </div>
      <div className={styles.formContainer}>
        <button className={styles.googleBtn} disabled={loading}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="google"
          />
          Continue with Google
        </button>
        <p>Or</p>
        <h3 className={styles.infoEmail}>Register with your email</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={registerSchema}
        >
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
            />
            <Field
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <Field
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <button
              disabled={loading}
              type="submit"
              className={styles.submitButton}
            >
              Register
            </button>
          </Form>
        </Formik>
        <p className={styles.alreadyAccount}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
