import * as Yup from "yup";

export const emailValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

export const usernamePasswordValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be between 3 and 20 characters")
    .max(20, "Username must be between 3 and 20 characters"),
  password: Yup.string().required(
    "Password must be at least 6 characters long"
  ),
});
