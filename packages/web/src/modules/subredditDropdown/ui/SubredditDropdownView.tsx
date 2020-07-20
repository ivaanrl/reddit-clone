import React, { useEffect, useState } from "react";
import "./SubredditDropdown.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useLocation, Link } from "react-router-dom";
import { usePopper } from "react-popper";
import OutsideAlerter from "../../../shared/outsideAlerter";
import RedditFeedHome from "./RedditFeedOptions/RedditFeedHome";
import SubredditDropdownDefaultSVG from "../../../shared/svgs/SubredditDropdownDefaultSVG";
import SubredditDropdownHomeSVG from "../../../shared/svgs/SubredditDropdownHomeSVG";

interface Props {
  showRedditFeed: boolean;
}

const SubredditDropdownView = (props: Props) => {
  const { showRedditFeed } = props;
  const subsOptions = useSelector((state: State) => state.auth.userSubs);
  const location = useLocation();
  const [selectedSubredditIcon, setSelectedSubredditIcon] = useState(
    <SubredditDropdownHomeSVG />
  );
  const [selectedSubreddit, setSelectedSubreddit] = useState("Home");

  useEffect(() => {
    const pathname = location.pathname.split("/");
    if (pathname.length > 2) {
      setSelectedSubreddit(pathname[2]);
      setSelectedSubredditIcon(<SubredditDropdownDefaultSVG />);
    } else {
      setSelectedSubreddit("Home");
      setSelectedSubredditIcon(<SubredditDropdownHomeSVG />);
    }
  }, [location]);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          boundary: referenceElement as HTMLElement,
        },
      },
    ],
    placement: "bottom",
  });

  const handleSelectedClick = () => {
    setPopoverOpen(!popoverOpen);
  };

  return (
    <React.Fragment>
      <div
        className="subreddit-dropdown-selected navbar-subreddit-dropdown prevent-reopen-subreddit-dropdown"
        title="subredditDropdown"
        onClick={handleSelectedClick}
        ref={setReferenceElement}
      >
        <div className="subreddit-dropdown-icon-name-container prevent-reopen-subreddit-dropdown">
          {selectedSubredditIcon}
          <div className="subreddit-dropdown-selected-name prevent-reopen-subreddit-dropdown">
            {selectedSubreddit}
          </div>
        </div>
        <i className="fa fa-caret-down subreddit-dropdown-caret-down prevent-reopen-subreddit-dropdown"></i>{" "}
      </div>
      {popoverOpen ? (
        <OutsideAlerter
          setPopoverOpen={setPopoverOpen}
          notCloseClass="prevent-reopen-subreddit-dropdown"
        >
          <div
            className="subreddit-dropdown-options-container"
            ref={setPopperElement}
            style={styles.poppper}
            {...attributes.poppper}
          >
            {showRedditFeed ? (
              <React.Fragment>
                <div className="subreddit-dropdown-options-subtitle">
                  REDDIT FEEDS
                </div>
                <RedditFeedHome setPopoverOpen={setPopoverOpen} />
              </React.Fragment>
            ) : null}

            <div className="subreddit-dropdown-options-subtitle">
              MY COMMUNITIES
            </div>
            {subsOptions.map((option) => {
              return (
                <Link
                  to={`/r/${option.name}`}
                  className="subreddit-dropdown-option-container"
                  onClick={() => setPopoverOpen(false)}
                >
                  <SubredditDropdownDefaultSVG />
                  <div className="subreddit-dropdown-option-name">
                    {option.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </OutsideAlerter>
      ) : null}
    </React.Fragment>
  );
};

export default SubredditDropdownView;
