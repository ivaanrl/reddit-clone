import React from "react";
import "./SearchPreviewResult.scss";
import { NavLink } from "react-router-dom";
interface Props {
  subredditName: string;
  adultContent: boolean;
  memberCount: number;
  closeSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchPreviewResult = (props: Props) => {
  const {
    subredditName,
    adultContent,
    memberCount,
    closeSearchResults,
  } = props;
  return (
    <NavLink
      to={`/r/${subredditName}`}
      className="search-preview-result-container"
      onClick={() => closeSearchResults(false)}
    >
      <div className="search-preview-result-name">{subredditName}</div>
      <div className="search-preview-result-info-container">
        <div className="search-preview-result-member-count">
          {memberCount} members
        </div>
        {adultContent ? (
          <div className="search-preview-result-nsfw">nsfw</div>
        ) : null}
      </div>
    </NavLink>
  );
};

export default SearchPreviewResult;
