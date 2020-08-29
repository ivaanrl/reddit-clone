import React from "react";
import ProfilePostsView from "./ui/ProfilePostsView";
import { ProfilePostsController } from "@reddit-clone/controller";
import ProfilePostsOrderBarConnector from "./ui/ProfilePostsOrderBarConnector";
import Animated from "react-native-reanimated";

interface Props {
  scrollY: Animated.Value<number>;
}

const ProfilePostsConnector = ({ scrollY }: Props) => {
  return (
    <ProfilePostsController>
      {({}) => {
        return (
          <React.Fragment>
            <ProfilePostsOrderBarConnector />
            <ProfilePostsView scrollY={scrollY} />
          </React.Fragment>
        );
      }}
    </ProfilePostsController>
  );
};

export default ProfilePostsConnector;
