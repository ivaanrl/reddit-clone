import React from "react";
import "./CreateCommunity.scss";
import { useFormik } from "formik";
import {
  communityTopics,
  createCommunityFormValidationSchema,
} from "@reddit-clone/common";
import Select from "react-select";
import superagent from "superagent";
import { useDispatch } from "react-redux";
import { allActions } from "@reddit-clone/controller";

interface Props {
  submit: (values: {
    name: string;
    communityTopics: string[];
    description: string;
    adultContent: boolean;
  }) => Promise<superagent.Response>;
  closeForm: () => void;
}

const CreateCommunityView = (props: Props) => {
  const dispatch = useDispatch();
  const { closeForm, submit } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      communityTopics: "",
      description: "",
      adultContent: false,
    },
    validationSchema: createCommunityFormValidationSchema,
    onSubmit: (values) => {
      handleSubmit(
        values as {
          name: string;
          communityTopics: any;
          description: string;
          adultContent: boolean;
        }
      );
    },
    validateOnBlur: true,
  });

  const {
    handleChange,
    values,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = formik;

  const handleSubmit = async (values: {
    name: string;
    communityTopics: string[];
    description: string;
    adultContent: boolean;
  }) => {
    dispatch(allActions.createSubreddit(values));
  };

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as Element).id === "create-community-form-modal") {
      closeForm();
    }
  };

  const handleSelectChange = (
    opt: { value: string; label: string }[],
    name: string
  ) => {
    if (opt) {
      const values: string[] = [];
      opt.forEach((option) => {
        values.push(option.value);
      });
      setFieldValue(name, values);
      //formik.setErrors({ name: "" });
    } else {
      setFieldValue(name, [""]);
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
        <div
          className="create-community-form-name 
          create-community-form-input-container"
        >
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
          {errors.name && touched.name ? (
            <div className="error-message">{errors.name}</div>
          ) : (
            <div className="spacer" />
          )}
        </div>
        <div
          className="create-community-form-community-topics 
          create-community-form-input-container"
        >
          <label htmlFor="communityTopics">Topics</label>
          <small>This will help relevant users find your community. 0/25</small>
          <div className="react-select-container">
            <Select
              className="react-select"
              classNamePrefix="react-select"
              isMulti
              name="communityTopics"
              id="communityTopics"
              type="select"
              onBlur={() => formik.setFieldTouched("communityTopics", true)}
              onChange={(opt: any, e: any) => {
                handleSelectChange(opt, "communityTopics");
              }}
              options={communityTopics}
              errors={errors.communityTopics}
              touched={formik.touched.communityTopics}
              placeholder="Add a primary topic"
            />
          </div>
          {errors.communityTopics && touched.communityTopics ? (
            <div className="error-message">{errors.communityTopics}</div>
          ) : (
            <div className="spacer" />
          )}
        </div>
        <div
          className="create-community-from-description 
          create-community-form-input-container"
        >
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            maxLength={500}
          />
          {errors.description && touched.description ? (
            <div className="error-message">{errors.description}</div>
          ) : (
            <div className="spacer" />
          )}
        </div>
        <div
          className="create-community-form-adult 
          create-community-form-input-container"
        >
          <div className="adult-title">Adult content</div>
          <div className="checkbox-label">
            <input
              name="adultContent"
              id="adultContent"
              type="checkbox"
              className="checkbox"
              checked={formik.values.adultContent}
              onChange={handleChange}
            />
            <label htmlFor="adultContent">
              <span className="nsfw-tag">NSFW</span> 18+ year old community{" "}
            </label>
          </div>
        </div>
        <div className="create-community-form-button-container">
          <button
            className="sidebar-main-button cancel-button"
            onClick={closeForm}
          >
            CANCEL
          </button>
          <button className="sidebar-secondary-button" type="submit">
            CREATE COMMUNITY
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunityView;
