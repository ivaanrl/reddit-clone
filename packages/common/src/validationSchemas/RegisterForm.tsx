import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email()
    .required("Required // Check correct error on reddit"),
  username: Yup.string().max(20, "<20. Check correct error on reddit"),
  password: Yup.string().required("check pasword error on reddit"),
});
