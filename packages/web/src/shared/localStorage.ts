import { authReducerState } from "@reddit-clone/controller/dist/modules/Redux/reducers/auth";

export const loadUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    if (user === null) {
      return undefined;
    }
    return JSON.parse(user);
  } catch (error) {
    return undefined;
  }
};

export const deleteUserFromLocalStorage = () => {
  try {
    localStorage.removeItem("user");
    return;
  } catch (error) {
    return;
  }
};
