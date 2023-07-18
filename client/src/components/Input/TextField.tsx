import React, { FC, useState } from "react";
import { GrFormClose } from "react-icons/gr";

import style from "./TextField.module.scss";

interface TextFieldProps {
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  name?: string;
}

const TextField: FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  setValue,
  name,
}) => {

  
  const handleClearInputField = () => {
    setValue("");
  };

  return (
    <div className={style.textField}>
      <label className={style.label}>{label}</label>
      <div className={style.inputContainer}>
        <input
          type="text"
          name={name}
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <button
            className={style.clearButton}
            onClick={handleClearInputField}
            aria-label="Clear Input"
          >
            <GrFormClose size={25} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;
