import configureMockStore from "redux-mock-store";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  waitForDomChange,
} from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import OrderBar from "../shared/modules/OrderBar/OrderBar";

const mockDispatch = jest.fn();
const mockGetPostsWithUsername = jest.fn();
const mockGetPostsHomepage = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "/r/nodejs" },
  }),
}));

const initialState = {
  subreddit: { page: 0 },
  homepage: { page: 0 },
  profile: { page: 0 },
};
const store = mockStore(initialState);

const defaultSort = "hot";

beforeEach(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <OrderBar
          getPostsHomepage={mockGetPostsHomepage}
          defaultSort={defaultSort}
          reducer="profile"
        />
      </BrowserRouter>
    </Provider>
  );
});

describe("it renders properly", () => {
  test("container and buttons are present", () => {
    const orderBarContainer = screen.getByTitle("order-bar-container");
    const orderBarButtons = screen.getAllByTitle("order-bar-option");

    expect(orderBarContainer).not.toBe(null);
    expect(orderBarButtons).not.toBe(null);
  });

  test("default button is active on render", () => {
    const activeButton = screen.getByTestId("order-bar-option-" + defaultSort);

    expect(activeButton.classList).toContain(
      "order-bar-sort-option-container-active"
    );
  });

  test("it calls the right function when reducer is homepage", () => {
    expect(mockGetPostsHomepage).toHaveBeenCalled();
  });

  test("it calls the right function when reducer is NOT homepage", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <OrderBar
            getPostsWithUsername={mockGetPostsWithUsername}
            defaultSort="hot"
            reducer="profile"
          />
        </BrowserRouter>
      </Provider>
    );

    expect(mockGetPostsWithUsername).toHaveBeenCalled();
  });
});

describe("buttons change style and push to history", () => {
  test("switches to new", async () => {
    const newButton = screen.getByTestId("order-bar-option-new");

    fireEvent.click(newButton);

    expect(location.search).toContain("new");
  });

  test("switches to top", async () => {
    const topButton = screen.getByTestId("order-bar-option-top");
    fireEvent.click(topButton);
    expect(location.search).toContain("top");

    const sortOrderButton = await screen.findByText("All Time");
    expect(sortOrderButton).toBeTruthy();
  });

  test("switches to hot", async () => {
    const hotButton = screen.getByTestId("order-bar-option-hot");

    fireEvent.click(hotButton);

    expect(location.search).toContain("hot");
  });
});
