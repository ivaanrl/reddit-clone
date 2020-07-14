import React, { useState } from "react";
import "./SearchBar.scss";

interface Props {
  search: (searchValue: string) => void;
}

const SearchBarView = (props: Props) => {
  const { search } = props;

  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    search(searchValue);
  };

  return (
    <React.Fragment>
      <input
        className="navbar-search-input"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
      ></input>
    </React.Fragment>
  );
};

export default SearchBarView;
