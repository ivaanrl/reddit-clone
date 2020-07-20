import React from "react";
import { SubredditDropdownController } from "@reddit-clone/controller";
import SubredditDropdownView from "./ui/SubredditDropdownView";

interface Props {
  showRedditFeeds: boolean;
}

const SubredditDropdownConnector = (props: Props) => {
  const { showRedditFeeds } = props;
  return (
    <SubredditDropdownController>
      {() => <SubredditDropdownView showRedditFeed={showRedditFeeds} />}
    </SubredditDropdownController>
  );
};

export default SubredditDropdownConnector;
