import React, { useEffect, useState } from "react";
import "./SubredditDropdown.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import { useLocation, Link } from "react-router-dom";
import { usePopper } from "react-popper";
import OutsideAlerter from "../../../shared/outsideAlerter";
import RedditFeedHome from "./RedditFeedOptions/RedditFeedHome";
import SubredditDropdownDefaultSVG from "../../../shared/svgs/SubredditDropdownDefaultSVG";
import SubredditDropdownCreatePostSVG from "../../../shared/svgs/SubredditDropdownCreatePostSVG";

interface Props {
  isNavbarDropdown: boolean;
  defaultIcon: JSX.Element;
  defaultText: string;
  useSameWidth: boolean;
  addToRedirectPath: string;
}

const SubredditDropdownView = (props: Props) => {
  const {
    isNavbarDropdown,
    defaultIcon,
    defaultText,
    useSameWidth,
    addToRedirectPath,
  } = props;
  const subsOptions = useSelector((state: State) => state.auth.userSubs);
  const location = useLocation();
  const [selectedSubredditIcon, setSelectedSubredditIcon] = useState<
    JSX.Element
  >(defaultIcon);
  const [selectedSubreddit, setSelectedSubreddit] = useState<string>(
    defaultText
  );

  useEffect(() => {
    const pathname = location.pathname.split("/");
    if (pathname.includes("submit") && isNavbarDropdown) {
      setSelectedSubreddit("Create Post");
      setSelectedSubredditIcon(<SubredditDropdownCreatePostSVG />);
    } else if (pathname.length > 2) {
      setSelectedSubreddit(pathname[2]);
      setSelectedSubredditIcon(<SubredditDropdownDefaultSVG />);
    } else {
      setSelectedSubreddit(defaultText);
      setSelectedSubredditIcon(defaultIcon);
    }
  }, [location]);

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const sameWidth = React.useMemo(
    () => ({
      name: "sameWidth",
      enabled: useSameWidth,
      phase: "beforeWrite" as
        | "beforeWrite"
        | "beforeRead"
        | "read"
        | "afterRead"
        | "beforeMain"
        | "main"
        | "afterMain"
        | "write"
        | "afterWrite"
        | undefined,
      requires: ["computeStyles"],
      fn: ({ state }: any) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      effect: ({ state }: any) => () => {
        state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
      },
    }),
    []
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      sameWidth,
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
            {isNavbarDropdown ? (
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
                  to={`/r/${option.name}/${addToRedirectPath}`}
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
