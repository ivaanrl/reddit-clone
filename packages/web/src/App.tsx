import React, { useEffect } from "react";
import "./App.scss";
import NavbarConnector from "./modules/navbar/NavbarConnector";
import HomepageConnector from "./modules/homepage/HomepageConnector";
import { Switch, Route } from "react-router-dom";
import SubredditConnector from "./modules/subreddit/SubredditConnector";
import CreatePostConnector from "./modules/createpost/CreatePostConnector";
import { loadUserFromLocalStorage } from "./shared/localStorage";
import { useDispatch } from "react-redux";
import { allActions } from "@reddit-clone/controller";
import FullPostConnector from "./modules/fullPost/FullPostConnector";
import FlashMessageConnector from "./modules/flashMessage/FlashMessageConnector";
import ProfileConnector from "./modules/profile/ProfileConnector";
import NotificationsConnector from "./modules/notifications/NotificationsConnector";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = loadUserFromLocalStorage();
    if (user) {
      dispatch(allActions.signinUserCompletedAction(user));
    }
  });

  return (
    <div>
      <NavbarConnector />
      <Switch>
        <Route
          path="/r/:subredditName/post/:id"
          component={FullPostConnector}
        />
        <Route
          path="/r/:subredditName/submit"
          component={CreatePostConnector}
        />
        <Route path="/r/:subredditName" component={SubredditConnector} />
        <Route path="/u/:username" component={ProfileConnector} />
        <Route path="/submit" component={CreatePostConnector} />
        <Route
          path="/notifications/:filter"
          component={NotificationsConnector}
        />
        <Route path="/" exact component={HomepageConnector} />
      </Switch>
      <FlashMessageConnector />
    </div>
  );
};

export default App;
