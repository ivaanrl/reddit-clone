import React, { useState } from "react";
import "./SignupForm.scss";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import {
  emailValidationSchema,
  usernamePasswordValidationSchema,
} from "@reddit-clone/common";
import superagent from "superagent";

interface Props {
  submit: (values: {
    email: string;
    username: string;
    password: string;
  }) => Promise<superagent.Response>;
}

export const EmailForm = (props: {
  errors: FormikErrors<{
    email: string;
  }>;
  touched: FormikTouched<{
    email: string;
  }>;
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}) => {
  const { errors, touched, handleChange } = props;

  return (
    <div className="input-container">
      <div className="description">
        By having a Reddit account, you can join, vote, and comment on all your
        favorite Reddit content.
      </div>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        placeholder="EMAIL"
        className={errors.email ? "input-error" : ""}
      />
      {(errors.email && touched.email) || touched.email ? (
        <div className="error-message">{errors.email}</div>
      ) : (
        <div className="spacer" />
      )}

      <button type="submit" className="submit-button">
        NEXT
      </button>

      <div className="already-reddit">
        Already a Redditor?{" "}
        <a href="/" className="login-link">
          LOG IN
        </a>
      </div>

      <div className="agreement">
        By continuing, you agree to our User Agreement and Privacy Policy
      </div>
    </div>
  );
};
EmailForm.label = "email";
EmailForm.validationSchema = emailValidationSchema;

const UsernamePasswordForm = (props: {
  errors: FormikErrors<{
    username: string;
    password: string;
  }>;
  touched: FormikTouched<{
    password: string;
    username: string;
  }>;
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  handlePrevStep: () => void;
}) => {
  const { errors, touched, handleChange, handlePrevStep } = props;
  return (
    <div className="username-password-container">
      <div className="description">
        <div className="title">Choose your username</div>
        <div className="text">
          Your username is how other community members will see you. This name
          will be used to credit you for things you share on Reddit. What should
          we call you?
        </div>
        <div className="separator" />
      </div>
      <div className="inputs-container">
        <input
          id="username"
          name="username"
          type="text"
          onChange={handleChange}
          placeholder="CHOOSE A USERNAME"
          className={errors.username ? "input-error" : ""}
        />
        {(errors.username && touched.username) || touched.username ? (
          <div className="error-message">{errors.username}</div>
        ) : (
          <div className="spacer" />
        )}

        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="PASSWORD"
          className={errors.password ? "input-error" : ""}
        />
        {(errors.password && touched.password) || touched.password ? (
          <div className="error-message">{errors.password}</div>
        ) : (
          <div className="spacer" />
        )}
      </div>
      <div style={{ width: "100%" }}>
        <div className="separator" />
        <div className="button-container">
          <button className="back-button" onClick={handlePrevStep}>
            Back
          </button>

          <button type="submit" className="submit-button">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};
UsernamePasswordForm.label = "username&Password";
UsernamePasswordForm.validationSchema = usernamePasswordValidationSchema;

const ChooseSubredditForm = () => {
  return <div></div>;
};
ChooseSubredditForm.label = "chooseSubreddit";
ChooseSubredditForm.validationSchema = {};

const steps = [EmailForm, UsernamePasswordForm, ChooseSubredditForm];

const SignupFormView = (props: Props) => {
  const { submit } = props;

  const [step, setStep] = useState<number>(0);

  const isSecondStep = () => {
    return step === 1;
  };

  /*const isLastStep = () => {
    return step === steps.length - 1;
  }; */

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values: any) => {
    const { setSubmitting } = formik;
    if (!isSecondStep()) {
      setSubmitting(false);
      handleNextStep();
      return;
    }

    //Handle final submit
    const signUpReponse = submit(values);
    console.log(signUpReponse);
    handleNextStep();
  };

  const CurrentStep = steps[step];
  const { validationSchema } = CurrentStep;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema,
  });

  return (
    <div className="form-backdrop">
      <div className="signupform-container">
        {step === 0 ? <div className="signupform-image-container"></div> : null}
        <form onSubmit={formik.handleSubmit} className={`step-${step}` || ""}>
          <CurrentStep
            errors={formik.errors}
            touched={formik.touched}
            handleChange={formik.handleChange}
            handlePrevStep={handlePrevStep}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupFormView;