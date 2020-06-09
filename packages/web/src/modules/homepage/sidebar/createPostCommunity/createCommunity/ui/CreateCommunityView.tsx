import React from "react";
import "./CreateCommunity.scss";
import { useFormik } from "formik";
import { communityTopics } from "@reddit-clone/common";
import Select from "react-select";
import CustomDropdown from "../../../../../../shared/CustomDropdown";

interface Props {
  submit: (values: any) => void;
  closeForm: () => void;
}

const CreateCommunityView = (props: Props) => {
  const { closeForm } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      communityTopics: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validateOnBlur: true,
  });

  const { handleChange, values, errors, handleBlur } = formik;

  const handleSubmit = (values: any) => {};

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as Element).id === "create-community-form-modal") {
      closeForm();
    }
  };

  return (
    <div
      className="create-community-form-contaiener"
      id="create-community-form-modal"
      onClick={handleModalClick}
    >
      <form className="create-community-form" onSubmit={formik.handleSubmit}>
        <div className="create-community-form-title">Create a community</div>
        <div className="create-community-form-name create-community-form-input-container">
          <label htmlFor="name">Name</label>
          <small>
            Community names including capitalization cannot be changed.
          </small>
          <input
            type="text"
            name="name"
            id="name"
            alt="name input"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
        </div>
        <div className="create-community-form-community-topics">
          <Select
            isMulti
            name="communityTopics"
            id="communityTopics"
            type="select"
            onBlur={() => formik.setFieldTouched("communityTopics", true)}
            onChange={(opt: any, e: any) => {
              formik.handleChange(e);
              formik.setFieldValue("communityTopic", opt.value);
            }}
            options={communityTopics}
            errors={errors.communityTopics}
            touched={formik.touched.communityTopics}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCommunityView;
