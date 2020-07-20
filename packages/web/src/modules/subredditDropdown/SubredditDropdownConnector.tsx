import React from "react";
import { SubredditDropdownController } from "@reddit-clone/controller";
import SubredditDropdownView from "./ui/SubredditDropdownView";

const SubredditDropdownConnector = () => {
  return (
    <SubredditDropdownController>
      {() => <SubredditDropdownView />}
    </SubredditDropdownController>
  );
};

export default SubredditDropdownConnector;
