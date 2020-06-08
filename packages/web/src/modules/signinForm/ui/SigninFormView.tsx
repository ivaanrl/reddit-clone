import React, { useEffect } from "react";
import "./SigninForm.scss";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { State, allActions } from "@reddit-clone/controller";
import { usernamePasswordValidationSchema } from "@reddit-clone/common";

interface Props {
  closeForm: () => void;
}

const SigninFormView = (props: Props) => {
  const { closeForm } = props;
  const dispatch = useDispatch();
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
    if (user.error?.message) {
      formik.setErrors({
        username: user.error.message,
        password: user.error.message,
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
    dispatch(allActions.signinUser(values));
  };

  return (
    <div className="form-backdrop">
      <div className="signupform-container">
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

              <button type="submit" className="signin-button">
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
        <button className="close-container" onClick={closeForm}>
          X
        </button>
      </div>
    </div>
  );
};

export default SigninFormView;
