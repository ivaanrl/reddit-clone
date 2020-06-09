import * as Yup from "yup";

export const createCommunityFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be between 3 and 20 characters")
    .max(20, "Name must be bewteen 3 and 20 characters")
    .required(),
  description: Yup.string()
    .min(15, "Description must be between 15 and 500 characters")
    .max(500, "Description must be between 15 and 500 characters"),
  communityTopics: Yup.array().required(),
  communityType: Yup.string().required(),
});
