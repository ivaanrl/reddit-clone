import { expectSaga } from "redux-saga-test-plan";
import { ActionTypes, allActions } from "../modules/Redux";
import {
  getSubreddit,
  getSubredditRequest,
} from "../modules/Redux/sagas/subreddit.sagas";
import { call, put } from "redux-saga-test-plan/matchers";

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

    function* mockGetSubreddit() {
      const user = yield call(getSubredditRequest, subName);
      yield put(allActions.getSubredditCompletedAction(APIResponse));
    }

    const APIResponse = {
      name: "nodejs",
      owner_id: "522663be-8903-4216-9df1-dae96343af51",
      topics: ["technology", "programming"],
      adultContent: false,
      description: "Official nodejs community",
      joined: 1,
      createdAt: "2020-07-02T21:38:14.026Z",
      mods: ["ivanrl"],
      posts: [],
    };

    return expectSaga(mockGetSubreddit)
      .provide([call(getSubredditRequest), APIResponse])
      .put(allActions.getSubredditCompletedAction(APIResponse))
      .run();
  });
});
