import React from "react";
import "./App.scss";
import NavbarConnector from "./modules/navbar/NavbarConnector";
import HomepageConnector from "./modules/homepage/HomepageConnector";
import { Switch, Route } from "react-router-dom";
import SubredditConnector from "./modules/subreddit/SubredditConnector";
import CreatePostConnector from "./modules/createpost/CreatePostConnector";

const App = () => {
  return (
    <div>
      <NavbarConnector />
      <Switch>
        <Route
          path="/r/:subredditName/submit"
          component={CreatePostConnector}
        />
        <Route path="/r/:subredditName" component={SubredditConnector} />
        <Route path="/submit" component={CreatePostConnector} />
        <Route path="/" exact component={HomepageConnector} />
      </Switch>
    </div>
  );
};

export default App;
