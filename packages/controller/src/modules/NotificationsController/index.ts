import { useDispatch } from "react-redux";
import { sanitizeContent } from "../../shared/sanitizePostHTML";
import { formatDate } from "../../shared/formatDate";
import { allActions } from "../Redux";

interface Props {
  children: (data: {
    getNotifications: (filter: string) => void;
  }) => JSX.Element;
}

export const NotificationsController = (props: Props) => {
  const dispatch = useDispatch();

  const getNotifications = (filter: string) => {
    dispatch(allActions.getNotifications(filter));
  };

  return props.children({ getNotifications });
};
