import { Formik } from "formik";
import * as Yup from "yup";
import { useToast } from "../../../context/ToastContext";
import { useState } from "react";
import { createProduct, Product } from "../../../pages/dashboard/Home/api";
import styles from "./CreateProduct.module.css";
import { useDialog } from "../../../context/DialogContext";
import { useRefresh } from "../../../context/RefreshContext";
const CreateProduct = () => {
  const showToast = useToast().showToast;
  const hideDialog = useDialog().hideDialog;
  const doRefresh = useRefresh().doRefresh;
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: "",
    product_id: "",
    description: "",
    base_url: "",
  };
  const createProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    product_id: Yup.string().required("Product ID is required"),
    description: Yup.string().required("Description is required"),
    base_url: Yup.string().required("Base URL is required"),
  });
  const submitHandler = (values: Product) => {
    console.log(values);
    setLoading(true);
    createProduct(values)
      .then((res) => {
        if (res.status === "success") {
          showToast("Product created successfully", 3000);
          hideDialog();
          doRefresh("products");
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
      <h2 className={styles.title}>Create Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={createProductSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="basic-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              className="basic-input"
            />
            {errors.name && touched.name ? (
              <div className="basic-form-error">{errors.name}</div>
            ) : null}
            <input
              type="text"
              name="product_id"
              placeholder="Product ID"
              value={values.product_id}
              onChange={handleChange}
              className="basic-input"
            />
            {errors.product_id && touched.product_id ? (
              <div className="basic-form-error">{errors.product_id}</div>
            ) : null}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={values.description}
              onChange={handleChange}
              className="basic-input"
            />
            {errors.description && touched.description ? (
              <div className="basic-form-error">{errors.description}</div>
            ) : null}
            <input
              type="text"
              name="base_url"
              placeholder="Base URL"
              value={values.base_url}
              onChange={handleChange}
              className="basic-input"
            />
            {errors.base_url && touched.base_url ? (
              <div className="basic-form-error">{errors.base_url}</div>
            ) : null}
            <button type="submit" disabled={loading} className="basic-button">
              Create
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
