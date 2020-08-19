import React from "react";
import { HomepageController } from "@reddit-clone/controller";
import HomepageView from "./ui/HomepageView";
import { SafeAreaView } from "react-native-safe-area-context";

const HomepageConnector = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <HomepageController>{() => <HomepageView />}</HomepageController>
    </SafeAreaView>
  );
};

export default HomepageConnector;
