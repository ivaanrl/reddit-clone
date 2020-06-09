import React from "react";
import Select from "react-select";
import { useField } from "formik";

interface Props {
  selectOptions: {
    value: string;
    label: string;
  }[];
  id: string;
  name: string;
  type: string;
}

const CustomDropdown = ({ options, label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <React.Fragment>
      <Select options={options} {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="custom-input-error">{meta.error}</span>
      ) : null}
    </React.Fragment>
  );
};

export default CustomDropdown;
