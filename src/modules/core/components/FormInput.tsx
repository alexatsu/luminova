import { FC } from "react";

import sass from "../sass/user/FormInput.module.scss";

interface FormProps {
  label: string;
  span?: string;
  type: string;
  autocomplete: string;
  attribute: string;
  placeholder: string;
}

export const FormInput: FC<FormProps> = ({
  label,
  type,
  autocomplete,
  attribute,
  span,
  placeholder,
}) => {
  return (
    <>
      <div className={sass.form} style={{ marginTop: "20px" }}>
        <label htmlFor={attribute}>
          {label} <span>{span}</span>
        </label>
        <input
          type={type}
          id={attribute}
          name={attribute}
          autoComplete={autocomplete}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};
