import React, { useState, useEffect } from "react";
import "./ProfileSectionBar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";

const ProfileSectionBarView = () => {
  const location = useLocation();
  const currentUser = useSelector((state: State) => state.auth);
  const user = useSelector((state: State) => state.profile);
  const [activeSection, setActiveSection] = useState("posts");
  let profileSections: string[];

  if (user.userInfo.username === currentUser.username) {
    profileSections = ["posts", "comments", "upvoted", "downvoted", "saved"];
  } else {
    profileSections = ["posts", "comments"];
  }

  useEffect(() => {
    const section = location.pathname.split("/")[3];
    setActiveSection(section);
  }, [location]);

  return (
    <div className="sections-container">
      {profileSections.map((section) => {
        const className =
          activeSection === section
            ? "sections-section active-section"
            : "sections-section";
        return (
          <NavLink
            to={`/u/${user.userInfo.username}/${section}`}
            className={className}
          >
            {section.toLocaleUpperCase()}
          </NavLink>
        );
      })}
    </div>
  );
};

export default ProfileSectionBarView;
