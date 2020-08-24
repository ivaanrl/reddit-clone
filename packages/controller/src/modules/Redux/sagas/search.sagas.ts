import { ActionTypes, BaseAction } from "../actions";
import { takeEvery, call, put } from "redux-saga/effects";
import superagent from "superagent";
import { APIUrl } from "../../../requestInfo";
import {
  getPreviewSearchResultsCompletedAction,
  getPreviewSearchResultFailed,
} from "../actions/search";

export function* watchGetSearchPreview() {
  yield takeEvery(
    ActionTypes.GET_PREVIEW_SEARCH_RESULTS,
    getPreviewSearchResults
  );
}

export function* getPreviewSearchResults(searchInfo: {
  type: string;
  payload: string;
}) {
  try {
    const searchPreviewResults = yield call(
      getPreviewSearchResultsRequest,
      searchInfo.payload
    );
    yield put(
      getPreviewSearchResultsCompletedAction(searchPreviewResults.body)
    );
  } catch (error) {
    yield put(
      getPreviewSearchResultFailed({
        status: error.status,
        text: error.response.body.message,
      })
    );
  }
}

export const getPreviewSearchResultsRequest = (searchValue: string) => {
  let response;
  try {
    response = superagent
      .agent()
      .withCredentials()
      .get(APIUrl + "/search/" + searchValue);
  } catch (error) {
    response = error.response;
  }

  return response;
};
