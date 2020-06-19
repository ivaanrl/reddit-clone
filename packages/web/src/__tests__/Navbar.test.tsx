import NavbarConnector from "../modules/navbar/NavbarConnector";
import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";

const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: "need/to/find/how/to/test/useHistory" },
  }),
}));

describe("Navbar UI is properly displayed", () => {
  beforeEach(() => {
    render(<NavbarConnector />);
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
    render(<NavbarConnector />);
  });

  test("displays correctly on parent element click", async () => {
    const divTitle = "popover-div";
    const title = /VIEW OPTIONS/;

    await act(async () => {
      fireEvent.click(screen.getByTestId(divTitle));
      await waitForElement(() => screen.getByText(title));
    });

    expect(screen.getByText(title)).not.toBe(null);
  });

  test("is not shown after click outside", async () => {
    const divTitle = "popover-div";
    const title = /VIEW OPTIONS/;

    await act(async () => {
      fireEvent.click(screen.getByTestId(divTitle));
      await waitForElement(() => screen.getByText(title));
      fireEvent.click(screen.getByTitle(divTitle));
    });

    expect(screen.queryByText(title)).toBe(null);
  });
});

describe("user can open login form", () => {
  beforeEach(() => {
    render(<NavbarConnector />);
  });

  it("opens signup form", async () => {
    const signupFormButtonText = /NEXT/;
    const openSignupButtonText = /SIGN UP/;
    await act(async () => {
      fireEvent.click(screen.getByText(openSignupButtonText));
      await waitForElement(() => screen.getByText(signupFormButtonText));
    });

    expect(screen.getByText(signupFormButtonText)).not.toBe(null);
  });

  it("closes signup form", async () => {
    const openSignupButtonText = /SIGN UP/;
    const closeFormButtonText = "X";

    await act(async () => {
      fireEvent.click(screen.getByText(openSignupButtonText));
      await waitForElement(() => screen.getByText(closeFormButtonText));
      fireEvent.click(screen.getByText(closeFormButtonText));
    });

    expect(screen.queryByText(closeFormButtonText)).toBe(null);
  });
});
