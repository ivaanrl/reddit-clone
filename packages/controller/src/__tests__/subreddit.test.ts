import { expectSaga } from "redux-saga-test-plan";
import { ActionTypes, allActions } from "../modules/Redux";
import {
  getSubreddit,
  getSubredditRequest,
} from "../modules/Redux/sagas/subreddit.sagas";

describe("Subredit Saga", () => {
  test("calls the api for non-existing sub and sets error 404 in state", () => {
    const subName = "javascript";

    return expectSaga(getSubreddit, {
      type: ActionTypes.GET_SUBREDDIT,
      payload: subName,
    })
      .call(getSubredditRequest, subName)
      .put(allActions.getSubredditFailed(404))
      .run();
  });

  test("calls the api for valid subreddit and sets it in state", () => {
    const subName = "nodejs";

    return expectSaga(getSubreddit, {
      type: ActionTypes.GET_SUBREDDIT,
      payload: subName,
    })
      .call(getSubredditRequest, subName)
      .put(
        allActions.getSubredditCompletedAction({
          id: 112,
          name: "nodejs",
          owner_id: "150415ad-76e3-4763-b235-71588b0c6e2c",
          topics: ["programming", "technology"],
          adultContent: false,
          description: "Official Nodejs subreddit",
          joined: 1,
        })
      )
      .run();
  });
});
