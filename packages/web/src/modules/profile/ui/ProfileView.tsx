import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useLocation } from "react-router-dom";
import ProfilePostsConnector from "./profilePosts/ProfilePostsConnector";
import ProfileSidebarConnector from "./profileSidebar/ProfileSidebarConnector";
import ProfileSectionBarConnector from "./profileSectionBar/ProfileSectionBarConnector";
import ProfileUpvotedConnector from "./profileUpvoted/ProfileUpvotedConnector";

interface Props {
  getProfile: (username: string) => void;
}

const ProfileView = (props: Props) => {
  const { getProfile } = props;
  const location = useLocation();
  const [sectionToRender, setSectionToRender] = useState<JSX.Element>(
    <ProfilePostsConnector />
  );

  const changeSection = (section: string) => {
    switch (section) {
      case "posts":
        setSectionToRender(<ProfilePostsConnector />);
        break;
      case "upvoted":
        setSectionToRender(<ProfileUpvotedConnector />);
        break;
      default:
        setSectionToRender(<ProfilePostsConnector />);
    }
  };

  useEffect(() => {
    const pathname = location.pathname.split("/");
    const username = pathname[2];
    const section = pathname[3];
    changeSection(section);
    getProfile(username);
  }, [location, getProfile]);

  return (
    <div>
      <ProfileSectionBarConnector />
      <div className="main-container">
        {sectionToRender}
        <ProfileSidebarConnector />
      </div>
    </div>
  );
};

export default ProfileView;
