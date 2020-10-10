import React, { useState, useEffect } from "react";
import "./SignupForm.scss";
import { useFormik, FormikErrors, FormikTouched } from "formik";
import {
  emailValidationSchema,
  usernamePasswordValidationSchema,
} from "@reddit-clone/common";
import superagent from "superagent";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

interface Props {
  checkEmailAvailability: (email: string) => Promise<superagent.Response>;
  closeForm: () => void;
  submitForm: (values: {
    email: string;
    password: string;
    username: string;
  }) => void;
  switchForm: () => void;

}

const EmailForm = (props: {
  errors: FormikErrors<{
    email: string;
  }>;
  touched: FormikTouched<{
    email: string;
  }>;
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
  switchForm: () => void;
}) => {
  const { errors, touched, handleChange, handleBlur,switchForm } = props;

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
        alt="email input"
        onChange={handleChange}
        placeholder="EMAIL"
        className={errors.email ? "input-error" : ""}
        onBlur={handleBlur}
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
        <span className="login-link" onClick={switchForm} >
          LOG IN
        </span>
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
  handleBlur: (eventOrString: any) => void | ((e: any) => void);
}) => {
  const { errors, touched, handleChange, handlePrevStep, handleBlur } = props;
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
          alt="username input"
          onChange={handleChange}
          placeholder="CHOOSE A USERNAME"
          className={errors.username ? "input-error" : ""}
          onBlur={handleBlur}
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
          alt="password input"
          onChange={handleChange}
          placeholder="PASSWORD"
          className={errors.password ? "input-error" : ""}
          onBlur={handleBlur}
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
  return (
    <div>
      <button>FOR NOW, CLOSE FORM.</button>
    </div>
  );
};
ChooseSubredditForm.label = "chooseSubreddit";
ChooseSubredditForm.validationSchema = {};

const steps = [EmailForm, UsernamePasswordForm, ChooseSubredditForm];

const SignupFormView = (props: Props) => {
  const { closeForm, checkEmailAvailability, submitForm, switchForm } = props;
  const user = useSelector((state: State) => state.auth);

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
      if (step === 0) {
        const isEmailAvailable = await checkEmailAvailability(
          formik.values.email
        );
        if (isEmailAvailable.status === 201) {
          if (isEmailAvailable.body) {
            handleNextStep();
            return;
          } else {
            formik.setErrors({
              email: "An account with that email address already exists",
            });
            return;
          }
        } else {
          //redirect to server error page
        }
      }
      handleNextStep();
      return;
    }

    submitForm(formik.values);
    //need to implement recommended subreddits after sign up
    //handleNextStep();
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

  useEffect(() => {
    if (user.message.text) {
      formik.setErrors({
        username: user.message.text,
      });
    } else {
      if (user.username) {
        closeForm();
      }
    }
  }, [user, closeForm, formik]);

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
            handleBlur={formik.handleBlur}
            switchForm={switchForm}
          />
        </form>
        <button
          className="close-container"
          onClick={closeForm}
          title="close-signup-form-button"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SignupFormView;
