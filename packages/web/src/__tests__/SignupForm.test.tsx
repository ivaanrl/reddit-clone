import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  screen,
  waitForElement,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionTypes } from "@reddit-clone/controller";
import SignupFormConnector from "../modules/signupForm/SignupFormConnector";
import faker from "faker";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockDispatch = jest.fn();

const mockCloseForm = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const middlewares: any[] = [];
const mockStore = configureMockStore(middlewares);

const initialState = {
  auth: {
    username: "ivanrl",
    email: "roldanlusichivan@gmail.com",
    karma: 0,
    userSubs: [],
    message: {
      status: 0,
      text: 0,
    },
  },
};

const store = mockStore(initialState);

beforeEach(() => {
  render(
    <Provider store={store}>
      <SignupFormConnector closeForm={mockCloseForm} />
    </Provider>
  );
});

describe("form functions correctly", () => {
  test("signup function is called", async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    const username = faker.internet.userName();

    const emailInput = screen.getByAltText("email input");
    const nextButton = screen.getByRole("button", { name: "NEXT" });
    await act(async () => {
      await userEvent.type(emailInput, email);
      fireEvent.click(nextButton);
      await waitForElement(() => screen.getByAltText("username input"));
    });

    const usernameInput = screen.getByAltText("username input");
    const passwordInput = screen.getByAltText("password input");
    const signupButton = screen.getByRole("button", { name: "SIGN UP" });
    await act(async () => {
      await userEvent.type(usernameInput, username);
      await userEvent.type(passwordInput, password);
      fireEvent.click(signupButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.SIGNUP_USER,
      payload: {
        username,
        password,
        email,
      },
    });
  });

  test("close form button works", async () => {
    const closeFormButton = screen.getByTitle("close-signup-form-button");

    fireEvent.click(closeFormButton);
    expect(mockCloseForm).toHaveBeenCalled();
  });
});
