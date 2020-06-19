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
          name: "nodejs",
          owner_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
          topics: ["programming", "technology"],
          adultContent: false,
          description: "Official Nodejs subreddit",
          joined: 1,
          createdAt: "2020-06-19T05:45:01.167Z",
          mods: ["ivanrl"],
          posts: [],
        })
      )
      .run();
  });
});
