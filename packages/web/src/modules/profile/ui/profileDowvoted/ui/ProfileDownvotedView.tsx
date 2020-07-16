import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import ProfilePostConnector from "../../../profilePost/ProfilePostConnector";
import ProfileUnauthorized from "../../profileUnauthorized/ProfileUnauthorized";

interface Props {
  getDownvotes: (username: string) => void;
}

const ProfileDownvotedView = (props: Props) => {
  const { getDownvotes } = props;
  const history = useHistory();
  const currentUser = useSelector((state: State) => state.auth);
  const userProfile = useSelector((state: State) => state.profile);
  useEffect(() => {
    const username = history.location.pathname.split("/")[2];
    getDownvotes(username);
  }, [history, getDownvotes]);
  return (
    <React.Fragment>
      {userProfile.userInfo.username === currentUser.username ? (
        <div className="profile-container">
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
        </div>
      ) : (
        <ProfileUnauthorized />
      )}
    </React.Fragment>
  );
};

export default ProfileDownvotedView;
