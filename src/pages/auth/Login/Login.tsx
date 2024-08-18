import { Formik, Form, Field } from "formik";
import styles from "../CommonStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useToast } from "../../../context/ToastContext";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const redirect = useNavigate();
  const { showToast } = useToast();
  const initialValues = {
    email: "",
    password: "",
  };
  const submitHandler = (values: LoginForm) => {
    login(values.email, values.password).then((res) => {
      if (res.status === "success") {
        localStorage.setItem("accessToken", res.data.access_token);
        showToast("Logged in successfully");
        redirect("/dashboard");
      } else {
        showToast(res.message, 5000);
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Welcome Back!</h1>
        <p>Just enter your credentials, and you'll be logged in instantly.</p>
      </div>
      <div className={styles.formContainer}>
        <button className={styles.googleBtn}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="google"
          />
          Continue with Google
        </button>
        <p>Or</p>
        <h3 className={styles.infoEmail}>Login with your email</h3>
        <Formik initialValues={initialValues} onSubmit={submitHandler}>
          <Form className={styles.form}>
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
            <button type="submit" className={styles.submitButton}>
              Login
            </button>
          </Form>
        </Formik>
        <p className={styles.alreadyAccount}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
