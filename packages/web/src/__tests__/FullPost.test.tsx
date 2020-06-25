import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import FullPostView from "../modules/fullPost/ui/FullPostView";

const mockSelector = jest.fn();
const mockGetFullPost = jest.fn();
const mockSanitizeContent = jest.fn();
const mockFormatDate = jest.fn();
const mockVote = jest.fn();
const mockComment = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/r/nodejs/post/184",
  }),
}));

beforeEach(() => {
  render(
    <BrowserRouter>
      <FullPostView
        getFullPost={mockGetFullPost}
        sanitizeContent={mockSanitizeContent}
        formatDate={mockFormatDate}
        vote={mockVote}
        comment={mockComment}
      />
    </BrowserRouter>
  );
});

describe("renders properly", () => {
  test("displays voting buttons", () => {
    expect(screen.getByTitle("downvote-button")).not.toBe(null);
    expect(screen.getByTitle("upvote-button")).not.toBe(null);
    expect(screen.getByTitle("vote-count")).not.toBe(null);
  });

  test("display info", () => {
    expect(screen.getByTitle("subreddit-name")).not.toBe(null);
    expect(screen.getByTitle("posted-by")).not.toBe(null);
  });

  test("displays bottom bar", () => {
    expect(screen.getByTitle("bottom-bar")).not.toBe(null);
  });

  test("displays create comment container", () => {
    expect(screen.getByTitle("create-comment-container")).not.toBe(null);
  });

  test("calls api to get full post", () => {
    expect(mockGetFullPost).toHaveBeenCalled();
  });
});

describe("voting works", () => {
  test("upvote button dispatches correct action", () => {
    const upvoteButton = screen.getByTestId("upvote-svg");
    fireEvent.click(upvoteButton);

    expect(mockVote).toHaveBeenCalled();
  });

  test("downvote button dispatches correct action", () => {
    const downvote = screen.getByTestId("downvote-svg");
    fireEvent.click(downvote);

    expect(mockVote).toHaveBeenCalled();
  });
});
