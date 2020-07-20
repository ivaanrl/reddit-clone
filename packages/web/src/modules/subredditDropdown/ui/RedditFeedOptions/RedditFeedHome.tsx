import React from "react";
import { Link } from "react-router-dom";
import SubredditDropdownHomeSVG from "../../../../shared/svgs/SubredditDropdownHomeSVG";

interface Props {
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const RedditFeedHome = (props: Props) => {
  const { setPopoverOpen } = props;
  return (
    <Link
      to={"/"}
      className="subreddit-dropdown-option-container"
      onClick={() => setPopoverOpen(false)}
    >
      <SubredditDropdownHomeSVG />
      <div className="subreddit-dropdown-option-name">Home</div>
    </Link>
  );
};

export default RedditFeedHome;
