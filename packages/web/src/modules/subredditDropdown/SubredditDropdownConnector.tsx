import React from "react";
import { SubredditDropdownController } from "@reddit-clone/controller";
import SubredditDropdownView from "./ui/SubredditDropdownView";

interface Props {
  isNavbarDropdown: boolean;
  defaultIcon: JSX.Element;
  defaultText: string;
  useSameWidth: boolean;
  addToRedirectPath: string;
}

const SubredditDropdownConnector = (props: Props) => {
  const {
    isNavbarDropdown,
    defaultIcon,
    defaultText,
    useSameWidth,
    addToRedirectPath,
  } = props;
  return (
    <SubredditDropdownController>
      {() => (
        <SubredditDropdownView
          isNavbarDropdown={isNavbarDropdown}
          defaultIcon={defaultIcon}
          defaultText={defaultText}
          useSameWidth={useSameWidth}
          addToRedirectPath={addToRedirectPath}
        />
      )}
    </SubredditDropdownController>
  );
};

export default SubredditDropdownConnector;
