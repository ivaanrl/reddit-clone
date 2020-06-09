import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import SignupFormConnector from "../modules/signupForm/SignupFormConnector";
/*
test('', () => {})
const mockSelector = jest.fn();
const mockDispatch = jest.fn();
const mockCloseForm = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch,
}));

beforeEach(() => {
  render(<SignupFormConnector closeForm={mockCloseForm} />);
});

describe("form functions correctly", () => {
  test("signup function is called", async () => {
    const emailInput = screen.getByAltText("email input");
    const nextButton = screen.getByRole("button", { name: "NEXT" });
    await act(async () => {
      await userEvent.type(emailInput, "thisIsANewEmail@gmail.com");
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
    });

    const usernameInput = screen.getByAltText("username input");
    const passwordInput = screen.getByAltText("password input");
    const signupButton = screen.getByRole("button", { name: "SIGN UP" });
    await act(async () => {
      await userEvent.type(usernameInput, "ivanrlnew");
      await userEvent.type(passwordInput, "73442332Ivan");
      fireEvent.click(signupButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.SIGNIN_USER,
      payload: {
        username: "ivanrlnew",
        password: "73442332Ivan",
        email: "thisIsANewEmail@gmail.com",
      },
    });
  });
});
*/
