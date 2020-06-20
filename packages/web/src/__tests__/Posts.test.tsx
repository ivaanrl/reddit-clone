import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionTypes, rootReducer } from "@reddit-clone/controller";
import SubredditConnector from "../modules/subreddit/SubredditConnector";
import { Router, BrowserRouter } from "react-router-dom";
import PostsConnector from "../modules/posts/PostsConnector";
import { Provider } from "react-redux";
import { createStore } from "redux";
import configureMockStore from "redux-mock-store";
import { number } from "yup";
import PostConnector from "../modules/posts/post/PostConnector";
import PostView from "../modules/posts/post/ui/PostView";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/r/nodejs" },
  }),
}));

let postConnector: any;

beforeEach(() => {
  postConnector = render(
    <BrowserRouter>
      <PostConnector
        postInfo={{
          author_id: "author_id",
          author_username: "username",
          content: ["content"],
          createdAt: "2020-06-18T15:46:47.121-03",
          updatedAt: "2020-06-18T15:46:47.121-03",
          subreddit_name: "nodejs",
          votes: 0,
          title: "title",
          id: 125,
        }}
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

  test("displays title and content", () => {
    expect(screen.getByTitle("post-title")).not.toBe(null);
    expect(screen.getByTitle("post-content")).not.toBe(null);
  });

  test("displays creation date", () => {
    expect(screen.getByTitle("post-create-date")).not.toBe(null);
  });
});

describe("voting works", () => {
  test("upvote button dispatches correct action", () => {
    const upvoteButton = screen.getByTestId("upvote-svg");
    fireEvent.click(upvoteButton);

    expect(screen.getByTestId("upvote-svg")).toHaveClass("upvote-active");
    expect(screen.getByTitle("vote-count")).toHaveClass("vote-count-upvote");
  });

  test("downvote button dispatches correct action", () => {
    const downvote = screen.getByTestId("downvote-svg");
    fireEvent.click(downvote);

    expect(screen.getByTestId("downvote-svg")).toHaveClass("downvote-active");
    expect(screen.getByTitle("vote-count")).toHaveClass("vote-count-downvote");
  });
});
