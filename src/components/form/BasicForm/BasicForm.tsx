import { FieldConfig, useField } from "formik";
import styles from "./BasicForm.module.css";
import React, {
  CSSProperties,
  ChangeEvent,
  ClassAttributes,
  TextareaHTMLAttributes,
  useState,
} from "react";
import Select, { Props as SelectProps } from "react-select";

type InputForm = TextareaHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldConfig<HTMLInputElement>;

export const FormTextInput: React.FC<
  InputForm & { label?: string; styleClasses?: string }
> = ({ label, styleClasses, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={styles.inputBox + " " + styleClasses}>
      <span>
        {label} <sup>{props.required ? " *" : ""}</sup>{" "}
      </span>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const FormTextInputWithoutLabel = ({ ...props }: InputForm) => {
  const [field, meta] = useField(props);
  if (props.required) props.placeholder = `${props.placeholder} *`;
  return (
    <>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="FormErrorSpan">{meta.error}</span>
      ) : null}
    </>
  );
};

export const FormSelect = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.inputBox}>
      <span>
        {label}
        <sup>{props.required ? " *" : ""}</sup>
      </span>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const FormTextInputWhite = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.InputSet}>
      <label className={styles.formLabel}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const FormTextAreaWhite = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.InputSet}>
      <label className={styles.formLabel}>{label}</label>
      <textarea className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export type Option = {
  label: string;
  value: string | boolean | number;
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "white",
    border: ".1px solid #CFD3D4",
    borderRadius: "10px",
    width: "100%",
    padding: ".3rem .4rem",

    // minWidth: "200px"
  }),
};

interface FormSelectProps extends SelectProps<Option> {
  name: string;
  label: string;
  options: Option[];
  addOnChange?: Function;
  addStyles?: CSSProperties;
}

const FormReactSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  addOnChange = () => {},
  addStyles,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const handleChange = (selectedOption: any) => {
    addOnChange(selectedOption);
    if (rest.isMulti)
      helpers.setValue(selectedOption.map((obj: any) => obj.value));
    else helpers.setValue(selectedOption ? selectedOption.value : null);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const getSelectedOption = () => {
    if (!field.value) {
      return null;
    }
    if (rest.isMulti) {
      return (
        options.filter((option) => field.value.includes(option.value)) || null
      );
    }
    return options.find((option) => option.value === field.value) || null;
  };
  return (
    <div className={styles.InputSet}>
      <label className={styles.formLabel} htmlFor={name}>
        {label}
        <sup>{rest.required ? " *" : ""}</sup>
      </label>
      <Select
        {...rest}
        name={name}
        id={name}
        value={getSelectedOption()}
        isSearchable
        isClearable
        className={styles.reactSelect}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        styles={{
          control: (provided) => ({
            ...customStyles.control(provided),
            ...addStyles,
          }),
        }}
      />
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div>
      )}
    </div>
  );
};

export default FormReactSelect;

interface ImageFormProps {
  name: string;
  label: string;
}

export const FormImageComponent: React.FC<ImageFormProps> = ({
  label,
  ...props
}: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.InputSet}>
      <label className={styles.formLabel}>{label}</label>
      <input
        className={styles.image_input}
        type="file"
        accept="image/*"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

interface FormSelectWithoutLabelProps extends SelectProps<Option> {
  name: string;
  options: Option[];
  onchangeFunction: any;
}

export const FormReactSelectCustom: React.FC<FormSelectWithoutLabelProps> = ({
  name,
  options,
  onchangeFunction,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOption: any) => {
    helpers.setValue(selectedOption ? selectedOption.value : null);
    console.log(selectedOption.value);
    onchangeFunction(selectedOption.value);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  const getSelectedOption = () => {
    if (!field.value) {
      return null;
    }
    return options.find((option) => option.value === field.value) || null;
  };

  const customStyles: any = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#F3F3F4",
      border: "none",
      borderRadius: "10px",
      fontSize: "12px",
      fontWeight: "bold",
      color: "#000",
      width: "100%",
      padding: ".3rem .4rem",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#000", // Specify your desired color here
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none", // Hide the indicator separator
    }),
  };

  return (
    <>
      <Select
        {...rest}
        name={name}
        id={name}
        value={getSelectedOption()}
        isSearchable
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        styles={customStyles}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  );
};

export const FormCheckBox = ({ label, ...props }: any) => {
  const [field, meta, helper] = useField(props);

  //Work around :)
  const [checked, setChecked] = useState(meta.initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    helper.setValue(e.target.checked);
  };
  return (
    <div className={styles.checkBox}>
      <label className={styles.formLabel}>{label}</label>
      <input
        type="checkbox"
        {...field}
        {...props}
        checked={checked}
        onChange={handleChange}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
