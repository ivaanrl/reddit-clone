import { formatDate } from "../../shared/formatDate";
import { sanitizeContent } from "../../shared/sanitizePostHTML";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
  }) => JSX.Element;
}

export const ProfileCommentController = (props: Props) => {
  return props.children({
    sanitizeContent,
    formatDate,
  });
};
