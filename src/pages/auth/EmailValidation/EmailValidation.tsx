import { Formik, Form, Field } from "formik";
import styles from "./EmailValidation.module.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { resendEmail, validateEmail } from "../services/api";
type EmailValidationForm = {
  code: string;
};

const EmailValidation = () => {
  const [loading, setLoading] = useState(false);
  const [allowResend, setAllowResend] = useState(true);
  var [resendCountown, setResendCountdown] = useState(0);
  const redirect = useNavigate();
  var intervalId = 0;
  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      redirect("/register");
    }
  }, []);
  const initialValues = {
    code: "",
  };

  const emailValidationSchema = Yup.object().shape({
    code: Yup.string().required("Code is required"),
  });
  const submitHandler = (values: EmailValidationForm) => {
    setLoading(true);
    validateEmail(values.code)
      .then((res) => {
        if (res.status === "success") {
          alert("Email validated successfully");
          redirect("/dashboard");
        } else {
          alert(res.message);
        }
        setLoading(false);
      })
      .catch((_) => {
        setLoading(false);
        alert("An error occurred while validating email");
      });
  };
  const resendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (!allowResend) {
      return;
    }
    setAllowResend(false);
    resendCountown = 120;
    setResendCountdown(resendCountown);
    if (intervalId !== 0) {
      clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
      if (resendCountown == 0) {
        setAllowResend(true);
        clearInterval(intervalId);
      } else {
        resendCountown -= 1;
        setResendCountdown(resendCountown);
      }
    }, 1000);
    resendEmail().then((res) => {
      if (res.status === "success") {
        alert("Code sent successfully");
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>Confirm Email</h1>
        <p>
          We've sent a code to your email. Please enter the code to confirm your
          email.
        </p>
      </div>
      <div className={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={emailValidationSchema}
        >
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="number"
              name="code"
              placeholder="Code"
              required
            />
            <button
              disabled={loading}
              type="submit"
              className={styles.submitButton}
            >
              Confirm Email
            </button>
            <p className={styles.alreadyAccount}>
              Didn't receive the code?{" "}
              <a
                className={!allowResend ? styles.disabled : ""}
                href="#"
                onClick={resendCode}
              >
                Resend {resendCountown === 0 ? "" : `(${resendCountown})`}
              </a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default EmailValidation;
