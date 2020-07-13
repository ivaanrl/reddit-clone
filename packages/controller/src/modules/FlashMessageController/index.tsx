import { useDispatch } from "react-redux";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    removeError: (reducerName: string) => void;
  }) => JSX.Element;
}

export const FlashMessageController = (props: Props) => {
  const dispatch = useDispatch();

  const removeError = (reducerName: string) => {
    switch (reducerName) {
      case "auth":
        dispatch(allActions.removeAuthErrors());
        break;
      case "subreddit":
        dispatch(allActions.removeSubredditErrors());
        break;
      case "fullpost":
        dispatch(allActions.removeFullPostErrors());
        break;
      case "profile":
        dispatch(allActions.removeProfileMessages());
        break;
    }
  };

  return props.children({ removeError });
};
