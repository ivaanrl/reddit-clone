import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";
import ProfileOrderPostsBarConnector from "./ProfileOrderPostsBarConnector";
import ProfilePostLoading from "../../../profilePost/ui/ProfilePostLoading";

const ProfilePostsView = () => {
  const profilePosts = useSelector((state: State) => state.profile.posts);
  const { isLoading, hasMore } = useSelector((state: State) => state.profile);
  return (
    <div className="profile-container">
      <ProfileOrderPostsBarConnector />
      {profilePosts.map((profilePost, index) => {
        const {
          id,
          subreddit_name,
          title,
          votes,
          user_vote,
          createdAt,
        } = profilePost;
        return (
          <ProfilePostConnector
            id={id}
            subredditName={subreddit_name}
            title={title}
            voteCount={votes}
            userVote={user_vote}
            createdAt={createdAt}
            index={index}
            key={index}
          />
        );
      })}
      {isLoading && hasMore ? (
        <React.Fragment>
          <ProfilePostLoading />
          <ProfilePostLoading />
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ProfilePostsView;
