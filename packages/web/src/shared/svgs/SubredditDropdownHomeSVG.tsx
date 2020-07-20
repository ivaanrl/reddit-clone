import React from "react";
import "./SubredditDropdownIcon.scss";

const SubredditDropdownHomeSVG = () => {
  return (
    <svg
      className="subreddit-dropdown-icon prevent-reopen-subreddit-dropdown"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15,9.9V8A5,5,0,0,0,5,8V9.9c-2.41.45-4,1.24-4,2.13,0,1.41,4,2.56,9,2.56s9-1.15,9-2.56C19,11.14,17.41,10.35,15,9.9Zm-2,.94a9.62,9.62,0,0,1-3,.39,9.62,9.62,0,0,1-3-.39V8a3,3,0,0,1,6,0Z"></path>
      <path d="M2.74,14.6l3,2.12a7.39,7.39,0,0,0,8.6,0l3-2.12a24.63,24.63,0,0,1-7.26,1A24.63,24.63,0,0,1,2.74,14.6Z"></path>
      <circle cx="16" cy="4" r="4" fill="none"></circle>
      <circle cx="16" cy="4" r="3" fill="none"></circle>
    </svg>
  );
};

export default SubredditDropdownHomeSVG;
