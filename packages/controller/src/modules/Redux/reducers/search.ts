import { BaseAction, ActionTypes } from "../actions";

export type searchReducerState = {};

export const searchReducer = (
  state: searchReducerState = {},
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
