import React from "react";
import { ProfilePostController } from "@reddit-clone/controller";
import ProfilePostView from "./ui/ProfilePostView";

interface Props {
  id: string;
  subredditName: string;
  title: string;
  voteCount: number;
  userVote: number;
  index: number;
  createdAt: string;
}

const ProfilePostConnector = (props: Props) => {
  const {
    id,
    subredditName,
    title,
    voteCount,
    userVote,
    createdAt,
    index,
  } = props;

  return (
    <ProfilePostController>
      {({ vote, formatDate }) => (
        <ProfilePostView
          id={id}
          subredditName={subredditName}
          title={title}
          voteCount={voteCount}
          userVote={userVote}
          createdAt={createdAt}
          index={index}
          vote={vote}
          formatDate={formatDate}
        />
      )}
    </ProfilePostController>
  );
};

export default ProfilePostConnector;
