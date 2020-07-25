import React from "react";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";
import ProfileUnauthorized from "../../profileUnauthorized/ProfileUnauthorized";
import ProfileOrderDownvotedBarConnector from "./ProfileOrderDownvotedBarConnector";
import ProfilePostLoading from "../../../profilePost/ui/ProfilePostLoading";

const ProfileDownvotedView = () => {
  const currentUser = useSelector((state: State) => state.auth);
  const userProfile = useSelector((state: State) => state.profile);
  const { isLoading, hasMore } = useSelector((state: State) => state.profile);

  return (
    <React.Fragment>
      {userProfile.userInfo.username === currentUser.username ? (
        <div className="profile-container">
          <ProfileOrderDownvotedBarConnector />
          {userProfile.posts.map((downvotedPost, index) => {
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
          {isLoading && hasMore ? (
            <React.Fragment>
              <ProfilePostLoading />
              <ProfilePostLoading />
            </React.Fragment>
          ) : null}
        </div>
      ) : (
        <ProfileUnauthorized />
      )}
    </React.Fragment>
  );
};

export default ProfileDownvotedView;
