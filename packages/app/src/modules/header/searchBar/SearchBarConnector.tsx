import React from "react";
import { SearchBarController } from "@reddit-clone/controller";
import SearchBarView from "./ui/SearchBarView";

const SearchBarConnector = () => {
  return (
    <SearchBarController>
      {({ search }) => <SearchBarView search={search} />}
    </SearchBarController>
  );
};

export default SearchBarConnector;
