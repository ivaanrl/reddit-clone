import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import SigninFormConnector from "../modules/signinForm/SigninFormConnector";
import { ActionTypes } from "@reddit-clone/controller";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockSelector = jest.fn();
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
      <SigninFormConnector closeForm={mockCloseForm} />
    </Provider>
  );
});

describe("form functions correctly", () => {
  test("form is initially empty", () => {
    expect(screen.getByAltText("username input").value).toBe("");
    expect(screen.getByAltText("password input").value).toBe("");
  });

  test("user can fill in form", async () => {
    const usernameInput = screen.getByAltText("username input");
    const passwordInput = screen.getByAltText("password input");
    await act(async () => {
      await userEvent.type(usernameInput, "ivanrl");
      await userEvent.type(passwordInput, "73442332Ivan");
    });

    expect(usernameInput.value).toBe("ivanrl");
    expect(passwordInput.value).toBe("73442332Ivan");
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

  test("close form button works", async () => {
    const closeFormButton = screen.getByTitle("close-signin-form-button");

    fireEvent.click(closeFormButton);
    expect(mockCloseForm).toHaveBeenCalled();
  });
});
