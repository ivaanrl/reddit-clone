import React from "react";
import "./ProfileUnauthorized.scss";

const ProfileUnauthorized = () => {
  return (
    <div className="profile-container profile-unauthorized">
      <svg
        className="profile-unauthorized-logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <g>
          <path d="M10,16.25 C8.728,16.25 7.544,15.867 6.556,15.212 L15.212,6.556 C15.867,7.544 16.25,8.728 16.25,10 C16.25,13.4465 13.446,16.25 10,16.25 M3.75,10 C3.75,6.5535 6.554,3.75 10,3.75 C11.272,3.75 12.456,4.133 13.444,4.788 L4.788,13.444 C4.133,12.456 3.75,11.272 3.75,10 M10,1.25 C5.1675,1.25 1.25,5.1675 1.25,10 C1.25,14.8325 5.1675,18.75 10,18.75 C14.8325,18.75 18.75,14.8325 18.75,10 C18.75,5.1675 14.8325,1.25 10,1.25"></path>
        </g>
      </svg>
      <div className="unauthorized-main-message">
        You do not have permission to access this resource
      </div>
      <div className="unauthorized-sub-message">
        You can only look at your own saved posts and comments
      </div>
    </div>
  );
};

export default ProfileUnauthorized;
