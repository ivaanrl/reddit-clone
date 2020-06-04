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

describe("Navbar UI is properly displayed", () => {
  beforeEach(() => {
    render(<NavbarConnector />);
  });

  test("displays username", () => {
    const username = "username";
    expect(screen.queryByText(username)).not.toBe(null);
  });

  test("displays subreddit dropdown", () => {
    const subredditDropdown = "Subreddit dropdown";
    expect(screen.getByText(subredditDropdown)).not.toBe(null);
  });

  test("display karma", () => {
    const karmaText = /karma/;
    expect(screen.getByText(karmaText)).not.toBe(null);
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
    const karmaText = /karma/;
    const title = "MY STUFF";

    await act(async () => {
      fireEvent.click(screen.getByText(karmaText));
      await waitForElement(() => screen.getByText(title));
    });

    expect(screen.getByText(title)).not.toBe(null);
  });

  test("is not shown after click outside", async () => {
    const karmaText = /karma/;
    const title = "MY STUFF";

    await act(async () => {
      fireEvent.click(screen.getByText(karmaText));
      await waitForElement(() => screen.getByText(title));
      fireEvent.click(screen.getByText(karmaText));
    });

    expect(screen.queryByText(title)).toBe(null);
  });
});
