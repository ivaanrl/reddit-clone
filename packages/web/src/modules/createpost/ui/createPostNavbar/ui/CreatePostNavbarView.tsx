import React, { useState, useEffect } from "react";
import "./CreatePostNavbar.scss";
import { useLocation, Link } from "react-router-dom";

const CreatePostNavbarView = () => {
  const location = useLocation();
  const [activeOption, setActiveOption] = useState<string>("post");

  useEffect(() => {
    const activeOptionPath = location.search.split("=")[1];

    if (activeOptionPath) {
      setActiveOption(activeOptionPath);
    } else {
      setActiveOption("post");
    }
  }, [location]);

  return (
    <div className="create-post-navbar-container">
      <Link
        to={`${location.pathname}?submit=post`}
        className={
          activeOption === "post"
            ? "create-post-navbar-option-active"
            : "create-post-navbar-option"
        }
      >
        <i className="fa fa-comment create-post-navbar-icon" />
        <div className="create-post-navbar-name">Post</div>
      </Link>
      <Link
        to={`${location.pathname}?submit=image`}
        className={
          activeOption === "image"
            ? "create-post-navbar-option-active"
            : "create-post-navbar-option"
        }
      >
        <i className="fa fa-image create-post-navbar-icon" />
        <div className="create-post-navbar-name">Images & Video</div>
      </Link>
      <Link
        to={`${location.pathname}?submit=link`}
        className={
          activeOption === "link"
            ? "create-post-navbar-option-active"
            : "create-post-navbar-option"
        }
      >
        <i className="fa fa-link create-post-navbar-icon" />
        <div className="create-post-navbar-name">Link</div>
      </Link>
    </div>
  );
};

export default CreatePostNavbarView;
