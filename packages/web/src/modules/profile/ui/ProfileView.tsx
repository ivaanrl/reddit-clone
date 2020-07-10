import React, { useEffect } from "react";
import "./Profile.scss";
import { useLocation } from "react-router-dom";
import ProfilePostsConnector from "./profilePosts/ProfilePostsConnector";
import ProfileSidebarConnector from "./profileSidebar/ProfileSidebarConnector";

interface Props {
  getProfile: (username: string) => void;
}

const ProfileView = (props: Props) => {
  const { getProfile } = props;
  const location = useLocation();

  useEffect(() => {
    const username = location.pathname.split("/")[2];
    getProfile(username);
  }, [location, getProfile]);

  return (
    <div>
      <div className="main-container">
        <ProfilePostsConnector />
        <ProfileSidebarConnector />
      </div>
    </div>
  );
};

export default ProfileView;
