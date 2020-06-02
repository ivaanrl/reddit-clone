export const ActionTypes = {
  GET_HOMEPAGE: "[0] GET HOMEPAGE POSTS FROM SERVER",
};

export interface BaseAction {
  type: string;
  payload?: any;
}
