import React from "react";
import "./App.scss";
import NavbarConnector from "./modules/navbar/NavbarConnector";
import HomepageConnector from "./modules/homepage/HomepageConnector";
import { Switch, Route } from "react-router-dom";
import SubredditConnector from "./modules/subreddit/SubredditConnector";

const App = () => {
  return (
    <div>
      <NavbarConnector />
      <Switch>
        <Route path="/r/:subredditName" component={SubredditConnector} />
        <Route path="/" exact component={HomepageConnector} />
      </Switch>
    </div>
  );
};

export default App;
