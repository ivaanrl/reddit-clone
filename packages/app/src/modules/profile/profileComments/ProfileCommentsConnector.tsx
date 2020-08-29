import React from "react";
import { ProfileCommentsController } from "@reddit-clone/controller";
import ProfileCommentsView from "./ui/ProfileCommentsView";
import ProfileCommentsOrderBarConnector from "./ui/ProfileCommentsOrderBarConnector";
import Animated from "react-native-reanimated";

interface Props {
  scrollY: Animated.Value<number>;
}

const ProfileCommentsConnector = ({ scrollY }: Props) => {
  return (
    <ProfileCommentsController>
      {() => (
        <React.Fragment>
          <ProfileCommentsOrderBarConnector />
          <ProfileCommentsView scrollY={scrollY} />
        </React.Fragment>
      )}
    </ProfileCommentsController>
  );
};

export default ProfileCommentsConnector;
