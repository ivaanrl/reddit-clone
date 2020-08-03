import React, { useEffect } from "react";
import "./SigninForm.scss";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { usernamePasswordValidationSchema } from "@reddit-clone/common";

interface Props {
  closeForm: () => void;
  signin: (values: { username: string; password: string }) => void;
}

const SigninFormView = (props: Props) => {
  const { closeForm, signin } = props;
  const user = useSelector((state: State) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: usernamePasswordValidationSchema,
    validateOnBlur: true,
  });

  const { errors, touched, handleChange, values, handleBlur } = formik;

  useEffect(() => {
    if (user.message.text) {
      formik.setErrors({
        username: user.message.text,
        password: user.message.text,
      });
    } else {
      if (user.username) {
        closeForm();
      }
    }
  }, [user, closeForm, formik]);

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    signin(values);
  };

  return (
    <div className="form-backdrop">
      <div className="signupform-container" title="signupform">
        <div className="signupform-image-container"></div>
        <form onSubmit={formik.handleSubmit} className="step-0">
          <div className="signin-username-password-container">
            <div className="description">
              <div className="title">LOG IN</div>
              <div className="text">
                By continuing, you agree to our User Agreement and Privacy
                Policy.
              </div>
            </div>
            <div className="signin-inputs-container">
              <input
                type="text"
                name="username"
                id="username"
                alt="username input"
                placeholder="USERNAME"
                onChange={handleChange}
                value={values.username}
                className={errors.username ? "input-error" : ""}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <div className="error-message">{errors.username}</div>
              ) : (
                <div className="spacer" />
              )}
              <input
                type="password"
                name="password"
                id="password"
                alt="password input"
                placeholder="PASSWORD"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && touched.password ? (
                <div className="error-message">{errors.password}</div>
              ) : (
                <div className="spacer" />
              )}

              <button
                type="submit"
                className="signin-button"
                data-testid="signin-form-button"
              >
                LOG IN
              </button>
              <small>
                Forgot your <span className="forgot-span">username</span> or{" "}
                <span className="forgot-span">password</span>?
              </small>

              <small>
                New to reddit? <span className="signup-span">SIGN UP</span>
              </small>
            </div>
          </div>
        </form>
        <button
          className="close-container"
          onClick={closeForm}
          title="close-signin-form-button"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SigninFormView;
