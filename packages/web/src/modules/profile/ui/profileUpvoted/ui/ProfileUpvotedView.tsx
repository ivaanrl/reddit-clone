import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";

interface Props {
  getUpvotes: (username: string) => void;
}

const ProfileUpvotedView = (props: Props) => {
  const location = useLocation();
  const { getUpvotes } = props;
  const upvotedPosts = useSelector((state: State) => state.profile.posts);
  useEffect(() => {
    console.log("aa");
    const username = location.pathname.split("/")[2];
    getUpvotes(username);
  }, []);

  return (
    <div className="profile-container">
      {upvotedPosts.map((upvotedPost, index) => {
        const {
          id,
          subreddit_name,
          title,
          voteCount,
          user_vote,
          createdAt,
        } = upvotedPost;
        return (
          <ProfilePostConnector
            id={id}
            subredditName={subreddit_name}
            title={title}
            voteCount={voteCount}
            userVote={user_vote}
            createdAt={createdAt}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ProfileUpvotedView;
