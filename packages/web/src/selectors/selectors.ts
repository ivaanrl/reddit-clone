import { State } from "@reddit-clone/controller";

const userSelector = (state: State) => state.auth;

export const Selectors = {
  userSelector,
};
