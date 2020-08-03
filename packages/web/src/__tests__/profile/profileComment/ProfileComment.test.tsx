import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import uniqid from "uniqid";
import faker from "faker";
import ProfileCommentConnector from "../../../modules/profile/ui/profileComments/profileComment/ProfileCommentConnector";
import userEvent from "@testing-library/user-event";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
  useDispatch: () => mockDispatch,
}));

const userId = uniqid();
const profileUsername = "ivanrl";

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);
const initialState: {} = {};

const store = mockStore(initialState);

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/u/ivanrl/comments" },
  }),
  useLocation: () => ({
    pathname: "/u/ivanrl/comments",
    search: "",
  }),
}));

const commentId = uniqid();
const commentAuthorId = uniqid();
const commentContent = [
  faker.lorem.sentence(5),
  faker.lorem.sentence(5),
  faker.lorem.sentence(5),
];
const commentCreatedAt = "2020-06-18T15:46:47.121-03";
const commentVoteValue = 10;
const postId = uniqid();
const postSubredditName = faker.lorem.word();
const postAuthorUsername = faker.internet.userName();
const postTitle = faker.lorem.sentence(5);

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProfileCommentConnector
          commentId={commentId}
          commentAuthorId={commentAuthorId}
          commentAuthorUsername="ivanrl"
          commentContent={commentContent}
          commentCreatedAt={commentCreatedAt}
          commentVoteValue={commentVoteValue}
          postId={postId}
          postSubredditName={postSubredditName}
          postAuthorUsername={postAuthorUsername}
          postTitle={postTitle}
        />
      </BrowserRouter>
    </Provider>
  );
});

describe("renders properly", () => {
  test("html elements are present", () => {
    expect(screen.getByRole("profile-comment-container")).not.toBe(null);
    expect(screen.getByRole("profile-parent-post-postedby")).not.toBe(null);
    expect(screen.getByRole("profile-parent-post-subreddit")).not.toBe(null);
    expect(screen.getByRole("profile-parent-post-title")).not.toBe(null);
    expect(screen.getByRole("profile-parent-post-commented-on")).not.toBe(null);
  });
});

describe("user interaction works properly", () => {
  test("opens text editor", async () => {
    const replyButton = screen.getByRole("profile-comment-reply");
    fireEvent.click(replyButton);

    const textEditor = screen.getByRole("text-editor-main");
    /*await act(async () => {
      await userEvent.type(textEditor, "This is my test reply");
    }); */
  });
});
