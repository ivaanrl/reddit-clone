import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  getProfile: (username: string) => void;
}

const ProfileView = (props: Props) => {
  const { getProfile } = props;
  const location = useLocation();

  useEffect(() => {
    const username = location.pathname.split("");
    console.log(username);
    //getProfile('');
  }, []);

  return <div></div>;
};

export default ProfileView;
