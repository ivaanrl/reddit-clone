import React, { useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "@reddit-clone/common";

interface Props {
  submit: (values: any) => null;
}

const SignupFormView = (props: Props) => {
  const { submit } = props;

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });

  const [page, setPage] = useState(1);

  const handleNextPage = async () => {
    await formik.validateForm(); //Should find way to make formik.validateField() work.
    if (!formik.errors.email) {
      setPage(page + 1);
    }
  };

  return (
    <div className="signupform-container">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? 1 : 0}
      </form>
      {page === 3 ? (
        <button type="submit">submit</button>
      ) : (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
};

export default SignupFormView;
