import React from "react";
import { FlashMessageController, State } from "@reddit-clone/controller";
import FlashMessageView from "./ui/FlashMessageView";
import { useSelector } from "react-redux";

const FlashMessageConnector = () => {
  const auth = useSelector((state: State) => state.auth);
  const post = useSelector((state: State) => state.fullPost);
  const subreddit = useSelector((state: State) => state.subreddit);
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
        </React.Fragment>
      )}
    </FlashMessageController>
  );
};

export default FlashMessageConnector;
