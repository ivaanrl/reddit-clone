import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";

interface Props {
  getDownvotes: (username: string) => void;
}

const ProfileDownvotedView = (props: Props) => {
  const { getDownvotes } = props;
  const location = useLocation();
  const downvotedPosts = useSelector((state: State) => state.profile.posts);
  useEffect(() => {
    const username = location.pathname.split("/")[2];
    getDownvotes(username);
  }, []);
  return (
    <div className="profile-container">
      {downvotedPosts.map((downvotedPost, index) => {
        const {
          id,
          subreddit_name,
          title,
          voteCount,
          user_vote,
          createdAt,
        } = downvotedPost;
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

export default ProfileDownvotedView;
