import React from "react";
import { FlashMessageController, State } from "@reddit-clone/controller";
import FlashMessageView from "./ui/FlashMessageView";
import { useSelector } from "react-redux";

const FlashMessageConnector = () => {
  const auth = useSelector((state: State) => state.auth);
  const post = useSelector((state: State) => state.fullPost);
  const subreddit = useSelector((state: State) => state.subreddit);
  const profile = useSelector((state: State) => state.profile);
  const notifications = useSelector((state: State) => state.notifications);
  console.log(notifications.message);
  return (
    <FlashMessageController>
      {({ removeError }) => (
        <React.Fragment>
          {auth.message.text ? (
            <FlashMessageView
              message={auth.message.text}
              status={auth.message.status}
              name={"auth"}
              removeError={removeError}
            />
          ) : null}
          {subreddit.message.text ? (
            <FlashMessageView
              message={subreddit.message.text}
              status={subreddit.message.status}
              name={"subreddit"}
              removeError={removeError}
            />
          ) : null}
          {post.message.text ? (
            <FlashMessageView
              message={post.message.text}
              status={post.message.status}
              name={"fullpost"}
              removeError={removeError}
            />
          ) : null}
          {profile.message.text ? (
            <FlashMessageView
              message={profile.message.text}
              status={profile.message.status}
              name={"profile"}
              removeError={removeError}
            />
          ) : null}
          {notifications.message.text ? (
            <FlashMessageView
              message={notifications.message.text}
              status={notifications.message.status}
              name={"notification"}
              removeError={removeError}
            />
          ) : null}
        </React.Fragment>
      )}
    </FlashMessageController>
  );
};

export default FlashMessageConnector;
