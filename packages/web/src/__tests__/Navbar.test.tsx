import NavbarConnector from "../modules/navbar/NavbarConnector";
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import NavbarView from "../modules/navbar/ui/NavbarView";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "@reddit-clone/controller";

jest.mock("react-redux", () => ({
  ...(jest.requireActual("react-redux") as {}),
}));

const rootStore = createStore(rootReducer);

const mockSearch = jest.fn();
const mockSignout = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as {}),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "need/to/find/how/to/test/useHistory" },
  }),
  useLocation: () => ({
    pathname: "/r/nodejs/post/184",
  }),
}));

describe("Navbar UI is properly displayed", () => {
  beforeEach(() => {
    render(
      <Provider store={rootStore}>
        <NavbarConnector />
      </Provider>
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("doesn't display username if not logged in", () => {
    const username = "username";

    expect(screen.queryByText(username)).toBe(null);
  });

  test("displays subreddit dropdown", () => {
    const subredditDropdown = "subredditDropdown";
    expect(screen.getByTitle(subredditDropdown)).not.toBe(null);
  });

  test("doesn't display karma if not logged in", () => {
    const karmaText = /karma/;
    expect(screen.queryByText(karmaText)).toBe(null);
  });

  test("display search input", () => {
    const search = "Search";
    expect(screen.getByPlaceholderText(search)).not.toBe(null);
  });
});

describe("userinfo popover behaves correctly", () => {
  beforeEach(() => {
    render(
      <Provider store={rootStore}>
        <NavbarConnector />
      </Provider>
    );
  });

  test("displays correctly on parent element click", async () => {
    const divTitle = "popover-div";
    const title = /VIEW OPTIONS/;

    await act(async () => {
      fireEvent.click(screen.getByTestId(divTitle));
      await waitFor(() => screen.getByText(title));
    });

    expect(screen.getByText(title)).not.toBe(null);
  });

  test("is not shown after click outside", async () => {
    const divTitle = "popover-div";
    const title = /VIEW OPTIONS/;

    await act(async () => {
      fireEvent.click(screen.getByTestId(divTitle));
      await waitFor(() => screen.getByText(title));
      fireEvent.click(screen.getByTitle(divTitle));
    });

    expect(screen.queryByText(title)).toBe(null);
  });
});

describe("user can open login form", () => {
  beforeEach(() => {
    render(
      <Provider store={rootStore}>
        <NavbarConnector />
      </Provider>
    );
  });

  it("opens signup form", async () => {
    const signupFormButtonText = /NEXT/;
    const openSignupButtonText = /SIGN UP/;
    await act(async () => {
      fireEvent.click(screen.getByText(openSignupButtonText));
      await waitFor(() => screen.getByText(signupFormButtonText));
    });

    expect(screen.getByText(signupFormButtonText)).not.toBe(null);
  });

  it("closes signup form", async () => {
    const openSignupButtonText = /SIGN UP/;
    const closeFormButtonText = "X";

    await act(async () => {
      fireEvent.click(screen.getByText(openSignupButtonText));
      await waitFor(() => screen.getByText(closeFormButtonText));
      fireEvent.click(screen.getByText(closeFormButtonText));
    });

    expect(screen.queryByText(closeFormButtonText)).toBe(null);
  });
});

describe("correct functions are called", () => {
  beforeEach(() => {
    render(
      <Provider store={rootStore}>
        <NavbarView search={mockSearch} signoutUser={mockSignout} />
      </Provider>
    );
  });

  test("users can logout", async () => {
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "SIGN IN" }));
      await waitFor(() => screen.getByTitle("signupform"));
      const usernameInput = screen.getByAltText("username input");
      const passwordInput = screen.getByAltText("password input");
      await userEvent.type(usernameInput, "ivanrl");
      await userEvent.type(passwordInput, "73442332Ivan");

      fireEvent.click(screen.getByRole("button", { name: "LOG IN" }));
    });

    fireEvent.click(screen.getByTestId("popover-div"));
    fireEvent.click(screen.getByTitle("logout"));

    expect(mockSignout).toHaveBeenCalledTimes(1);
  });
});
