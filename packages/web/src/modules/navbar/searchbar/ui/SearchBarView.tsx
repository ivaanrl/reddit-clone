import React, { useState } from "react";
import "./SearchBar.scss";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import SearchPreviewResult from "./SearchPreviewResult";
import { usePopper } from "react-popper";
import OutsideAlerter from "../../../../shared/outsideAlerter";

interface Props {
  search: (searchValue: string) => void;
}

const SearchBarView = (props: Props) => {
  const { search } = props;
  const searchPreviewResults = useSelector(
    (state: State) => state.search.searchPreviewResults
  );

  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchValue(searchValue);
    if (searchValue.length > 0) {
      search(searchValue);
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  };

  const modifiyWidthInFn = ({ state }: any) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  };

  const modifiyWidthInEffect = ({ state }: any) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  };

  const sameWidth = React.useMemo(
    () => ({
      name: "sameWidth",
      enabled: true,
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

  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] = useState<HTMLElement | null>();
  const [popoverOpen, setPopoverOpen] = useState(false);

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
  });

  return (
    <React.Fragment>
      <input
        className="navbar-search-input"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearchChange}
        ref={setReferenceElement}
      ></input>
      {popoverOpen ? (
        <OutsideAlerter
          setPopoverOpen={setPopoverOpen}
          notCloseClass="prevent-reopen-searchbar"
        >
          <div
            className="searchbar-results-container"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {searchPreviewResults.map((searchResult) => {
              const { name, memberCount, adultContent } = searchResult;
              return (
                <SearchPreviewResult
                  subredditName={name}
                  memberCount={memberCount}
                  adultContent={adultContent}
                  closeSearchResults={setPopoverOpen}
                />
              );
            })}
          </div>
        </OutsideAlerter>
      ) : null}
    </React.Fragment>
  );
};

export default SearchBarView;
