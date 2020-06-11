import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State, allActions } from "@reddit-clone/controller";
import { useHistory } from "react-router-dom";

const SubredditView = () => {
  const dispatch = useDispatch();
  const {
    id,
    owner_id,
    name,
    description,
    joined,
    topics,
    adultContent,
  } = useSelector((state: State) => state.subreddit);

  useEffect(() => {
    const { location } = useHistory();
    console.log(location);
    //dispatch(allActions.getSubreddit())
  }, []);

  return (
    <React.Fragment>
      <div className="subreddit-header"></div>
      <div className="subreddit-main">
        <div className="subreddit-name" title="subreddit-name">
          {name}{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubredditView;
