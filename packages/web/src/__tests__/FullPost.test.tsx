import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter, useLocation } from "react-router-dom";
import FullPostView from "../modules/fullPost/ui/FullPostView";
import * as redux from "react-redux";
import createMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockSelector = jest.fn();
const mockGetFullPost = jest.fn();
const mockSanitizeContent = jest.fn();
const mockFormatDate = jest.fn();
const mockVote = jest.fn();
const mockComment = jest.fn();

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({
  id: "125",
  author_username: "ivanrl",
  comments: [
    {
      path: "125.aokjsbd",
      id: "aokjsbd",
      author_id: "",
      content: ["a", "b"],
      post_id: "125",
      comment_id: "aokjsbd",
      createdAt: "2020-06-18T15:46:47.121-03",
      updatedAt: "2020-06-18T15:46:47.121-03",
      voteValue: 0,
      user_vote: 0,
      replies: [],
    },
    {
      path: "125.anlas",
      id: "anlas",
      author_id: "",
      content: ["a", "b"],
      post_id: "125",
      comment_id: "anlas",
      createdAt: "2020-06-18T15:46:47.121-03",
      updatedAt: "2020-06-18T15:46:47.121-03",
      voteValue: 0,
      user_vote: 0,
      replies: [],
    },
  ],
});

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useLocation: () => ({
    pathname: "/r/nodejs/post/184",
  }),
}));

const store = createMockStore();

beforeEach(() => {
  render(
    <Provider store={store()}>
      <BrowserRouter>
        <FullPostView
          getFullPost={mockGetFullPost}
          sanitizeContent={mockSanitizeContent}
          formatDate={mockFormatDate}
          vote={mockVote}
          comment={mockComment}
        />
      </BrowserRouter>
    </Provider>
  );
});

describe("renders properly", () => {
  test("displays voting buttons", () => {
    expect(screen.queryAllByTitle("downvote-button")).not.toBe(null);
    expect(screen.queryAllByTitle("upvote-button")).not.toBe(null);
    expect(screen.queryAllByTitle("vote-count")).not.toBe(null);
  });

  test("display info", () => {
    expect(screen.getByTitle("subreddit-name")).not.toBe(null);
    expect(screen.getByTitle("posted-by")).not.toBe(null);
  });

  test("displays bottom bar", () => {
    expect(screen.queryAllByTitle("bottom-bar")).not.toBe(null);
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
    const upvoteButton = screen.queryAllByTitle("upvote-button");
    act(() => {
      fireEvent.click(upvoteButton[0]);
    });

    expect(mockVote).toHaveBeenCalled();
  });

  test("downvote button dispatches correct action", async () => {
    const downvote = screen.queryAllByTitle("downvote-button");
    await act(async () => {
      fireEvent.click(downvote[0]);
    });

    expect(mockVote).toHaveBeenCalled();
  });
});
