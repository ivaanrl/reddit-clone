import { expectSaga, testSaga } from "redux-saga-test-plan";
import {
  signinUser,
  signinRequest,
  signupUser,
  signupRequest,
} from "../modules/Redux/sagas/auth.sagas";
import { ActionTypes } from "../modules/Redux";
import {
  signinUserCompletedAction,
  signinUserFailed,
  signupUserFailed,
  signupUserCompletedAction,
} from "../modules/Redux/actions/auth";
import * as Str from "@supercharge/strings";

describe("Authsaga", () => {
  describe("signin", () => {
    it("calls the api and logs in the user", () => {
      const userInfo = {
        username: "ivanrl",
        password: "73442332Ivan",
      };
      return expectSaga(signinUser, {
        type: ActionTypes.SIGNIN_USER,
        payload: userInfo,
      })
        .call(signinRequest, userInfo)
        .put(
          signinUserCompletedAction({
            username: "ivanrl",
            email: "ivanrl2010@gmail.com",
            karma: 0,
            userSubs: [{ name: "nodejs", adultContent: false }],
          })
        )
        .run();
    });

    it("handles errors storing the response in state", () => {
      const userInfo = {
        username: "ivanrl",
        password: "ilikecats",
      };

      return expectSaga(signinUser, {
        type: ActionTypes.SIGNIN_USER,
        payload: userInfo,
      })
        .call(signinRequest, userInfo)
        .put(
          signinUserFailed({
            error: {
              status: 401,
              message: "Invalid username/password combination",
            },
          })
        )
        .run();
    });
  });

  describe("signup", () => {
    let userInfo: {
      username: string;
      password: string;
      email: string;
    };
    beforeAll(() => {
      userInfo = {
        username: Str.random(),
        password: Str.random(),
        email: Str.random(),
      };
    });
    it("users are logged in after signup", () => {
      return expectSaga(signupUser, {
        type: ActionTypes.SIGNUP_USER,
        payload: userInfo,
      })
        .call(signupRequest, userInfo)
        .put(
          signupUserCompletedAction({
            username: userInfo.username,
            email: userInfo.email,
            karma: 0,
          })
        )
        .run();
    });

    it("can't create a user with repeated email", () => {
      return expectSaga(signupUser, {
        type: ActionTypes.SIGNUP_USER,
        payload: userInfo,
      })
        .call(signupRequest, userInfo)
        .put(
          signupUserFailed({
            error: {
              status: 401,
              message: "Username already taken",
            },
          })
        )
        .run();
    });
  });
});
