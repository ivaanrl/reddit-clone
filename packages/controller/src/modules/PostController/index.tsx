import sanitizeHTML from "sanitize-html";
import { allActions } from "../Redux/actions";
import { useDispatch } from "react-redux";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
    formatDate: (date: string) => string;
    vote: (id: number, voteValue: number) => void;
  }) => JSX.Element;
}

export const PostController = (props: Props) => {
  const sanitizeOptions = {
    allowedTags: [
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "s",
      "strike",
      "code",
      "br",
      "div",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "name", "target"],
    },
    selfClosing: ["br"],
    allowedSchemes: ["http", "https", "ftp", "mailto"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
  };

  const sanitizeContent = (content: string[]) => {
    const contentWithoutBars = content.map((line) => {
      return line.split("||");
    });

    return {
      __html: sanitizeHTML(contentWithoutBars.join("<br />"), sanitizeOptions),
    };
  };

  const formatDate = (date: string) => {
    const splitDate = date.split("T");
    const dateAsStr = splitDate[0].split("-");
    const timeAsStr = splitDate[1].split(":");

    const dateAsNum = dateAsStr.map((str) => {
      return parseInt(str, 10);
    });
    const timeAsNum = timeAsStr.map((str) => {
      return parseInt(str, 10);
    });

    const postDate = new Date(
      dateAsNum[0],
      dateAsNum[1],
      dateAsNum[2],
      timeAsNum[0],
      timeAsNum[1],
      timeAsNum[2]
    );
    const now = new Date();
    const timeDiff =
      (postDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (timeDiff < 23) {
      return `${Math.floor(timeDiff)} hours ago`;
    } else {
      const days = Math.floor(timeDiff / 24);
      if (days > 1) {
        return `${days} days ago`;
      } else {
        return `${days} day ago`;
      }
    }
  };

  const dispatch = useDispatch();
  const vote = (value: number, id: number) => {
    dispatch(allActions.votePost({ postId: id, voteValue: value }));
  };

  return props.children({ sanitizeContent, formatDate, vote });
};
