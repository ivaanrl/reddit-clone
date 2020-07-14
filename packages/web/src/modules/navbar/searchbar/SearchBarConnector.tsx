import React from "react";
import SearchBarView from "./ui/SearchBarView";
import { SearchBarController } from "@reddit-clone/controller";

const SearchBarConnector = () => {
  return (
    <SearchBarController>
      {({ search }) => <SearchBarView search={search} />}
    </SearchBarController>
  );
};

export default SearchBarConnector;
