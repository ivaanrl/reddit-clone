import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";
import ProfileOrderPostsBarConnector from "./ProfileOrderPostsBarConnector";

interface Props {
  getProfilePosts: (username: string) => void;
}

const ProfilePostsView = (props: Props) => {
  const { getProfilePosts } = props;
  const location = useLocation();
  const profilePosts = useSelector((state: State) => state.profile.posts);

  useEffect(() => {
    const username = location.pathname.split("/")[2];
    getProfilePosts(username);
  }, [getProfilePosts, location]);

  return (
    <div className="profile-container">
      <ProfileOrderPostsBarConnector />
      {profilePosts.map((profilePost, index) => {
        const {
          id,
          subreddit_name,
          title,
          voteCount,
          user_vote,
          createdAt,
        } = profilePost;
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

export default ProfilePostsView;
