import { ActionTypes } from "./types";
import { search } from "superagent";

export const getPreviewSearchResults = (searchValue: string) => ({
  type: ActionTypes.GET_PREVIEW_SEARCH_RESULTS,
  payload: searchValue,
});

export const getPreviewSearchResultsCompletedAction = (searchResult: any) => ({
  type: ActionTypes.GET_PREVIEW_SEARCH_RESULTS_COMPLETED,
  payload: searchResult,
});

export const getPreviewSearchResultFailed = (error: {
  status: number;
  text: string;
}) => ({
  type: ActionTypes.GET_PREVIEW_SEARCH_RESULTS_FAILED,
  payload: error,
});
