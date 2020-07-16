import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";
import ProfileUnauthorized from "../../profileUnauthorized/ProfileUnauthorized";

interface Props {
  getUpvotes: (username: string) => void;
}

const ProfileUpvotedView = (props: Props) => {
  const location = useLocation();
  const { getUpvotes } = props;

  const currentUser = useSelector((state: State) => state.auth);
  const userProfile = useSelector((state: State) => state.profile);
  useEffect(() => {
    const username = location.pathname.split("/")[2];
    getUpvotes(username);
  }, [getUpvotes, location]);

  return (
    <React.Fragment>
      {userProfile.userInfo.username === currentUser.username ? (
        <div className="profile-container">
          {userProfile.posts.map((upvotedPost, index) => {
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
      ) : (
        <ProfileUnauthorized />
      )}
    </React.Fragment>
  );
};

export default ProfileUpvotedView;
