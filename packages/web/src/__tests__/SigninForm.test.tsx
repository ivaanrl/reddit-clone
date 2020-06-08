import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import SigninFormConnector from "../modules/signinForm/SigninFormConnector";
import { ActionTypes } from "@reddit-clone/controller";

const mockSelector = jest.fn();
const mockDispatch = jest.fn();
const mockCloseForm = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  render(<SigninFormConnector closeForm={mockCloseForm} />);
});

describe("form functions correctly", () => {
  test("form is initially empty", () => {
    expect(screen.getByAltText("username input")).toHaveAttribute("value", "");
    expect(screen.getByAltText("password input")).toHaveAttribute("value", "");
  });

  test("user can fill in form", async () => {
    const usernameInput = screen.getByAltText("username input");
    const passwordInput = screen.getByAltText("password input");
    await act(async () => {
      await userEvent.type(usernameInput, "ivanrl");
      await userEvent.type(passwordInput, "73442332Ivan");
    });

    expect(usernameInput).toHaveAttribute("value", "ivanrl");
    expect(passwordInput).toHaveAttribute("value", "73442332Ivan");
  });

  test("signin function is called", async () => {
    const usernameInput = screen.getByAltText("username input");
    const passwordInput = screen.getByAltText("password input");
    const signInButton = screen.getByRole("button", { name: "LOG IN" });
    await act(async () => {
      await userEvent.type(usernameInput, "ivanrl");
      await userEvent.type(passwordInput, "73442332Ivan");
      fireEvent.click(signInButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.SIGNIN_USER,
      payload: {
        username: "ivanrl",
        password: "73442332Ivan",
      },
    });
  });
});
