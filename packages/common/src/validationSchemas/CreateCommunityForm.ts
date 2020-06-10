import * as Yup from "yup";

export const createCommunityFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be between 3 and 20 characters")
    .max(20, "Name must be bewteen 3 and 20 characters")
    .matches(
      /^([a-zA-Z0-9\_]+)$/gm,
      "Name can only contain alphanumeric and _ characters. No spaces allowed"
    )
    .required("Name is required"),
  description: Yup.string()
    .min(15, "Description must be between 15 and 500 characters")
    .max(500, "Description must be between 15 and 500 characters")
    .required("Description is required"),
  communityTopics: Yup.array()
    .of(Yup.string())
    .required("You must select between 1 and 25 topics for your community"),
});
