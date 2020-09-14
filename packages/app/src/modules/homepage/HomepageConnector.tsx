import React, { useEffect } from "react";
import { HomepageController, State } from "@reddit-clone/controller";
import HomepageView from "./ui/HomepageView";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useSelector } from "react-redux";

const HomepageConnector = () => {
  const homepage = useSelector((state: State) => state.homepage);

  useEffect(() => {
    (async function () {
      await SplashScreen.preventAutoHideAsync();
    })();
  }, []);

  useEffect(() => {
    (async function () {
      if (homepage.posts.length > 0 && !homepage.isLoading) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [homepage.posts, homepage.isLoading]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <HomepageController>{() => <HomepageView />}</HomepageController>
    </SafeAreaView>
  );
};

export default HomepageConnector;
