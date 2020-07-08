import { BaseAction, ActionTypes } from "../actions";

export type profileReducerState = {};

export const profileReducer = (
  state: profileReducerState = {},
  action: BaseAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
