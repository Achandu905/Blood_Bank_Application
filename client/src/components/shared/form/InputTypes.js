import React from "react";

const InputTypes = ({
  labelText,
  labelFor,
  inputType,
  value,
  name,
  onChange,
}) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor={labelFor} className="form-label">
          {labelText}
        </label>
        <input
          type={inputType}
          className="form-control"
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputTypes;
