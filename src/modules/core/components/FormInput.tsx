import { FC } from "react";

import sass from "../sass/components/FormInput.module.scss";
//todo, remove it
interface FormProps {
  label: string;
  span?: string;
  type: string;
  autocomplete: string;
  attribute: string;
  placeholder: string;
  value?: string;
  setValue?: (value: string) => void;
}

export const FormInput: FC<FormProps> = ({
  label,
  type,
  autocomplete,
  attribute,
  span,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <div>
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
          value={value}
          onChange={(e) => setValue?.(e.target.value)}
        />
      </div>
    </div>
  );
};
