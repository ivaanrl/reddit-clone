import { searchReducerState } from "../../../shared/types/search";
import { BaseAction, ActionTypes } from "../actions";

export const searchReducer = (
  state: searchReducerState = {
    searchPreviewResults: [],
  },
  action: BaseAction
) => {
  switch (action.type) {
    case ActionTypes.GET_PREVIEW_SEARCH_RESULTS_COMPLETED:
      return { ...state, ...action.payload };
    case ActionTypes.GET_PREVIEW_SEARCH_RESULTS_FAILED:
      return {
        ...state,
        ...{
          message: { status: action.payload.status, text: action.payload.text },
        },
      };
    default:
      return state;
  }
};
