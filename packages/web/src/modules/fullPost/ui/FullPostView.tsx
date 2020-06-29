import React, { useEffect, useState } from "react";
import "./FullPost.scss";
import { useLocation, NavLink } from "react-router-dom";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import Vote from "../../posts/vote/Vote";
import TextEditor from "../../../shared/TextEditor";
import { HTMLSerializer } from "../../../shared/HTMLSerializer";
import CommentsConnector from "../comments/CommentsConnector";

interface Props {
  getFullPost: (postId: number) => void;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: number, voteValue: number) => void;
  comment: (postId: number, content: string[]) => void;
}

const FullPostView = (props: Props) => {
  const location = useLocation();
  const { getFullPost, sanitizeContent, formatDate, vote, comment } = props;
  const user = useSelector((state: State) => state.auth);
  const post = useSelector((state: State) => state.fullPost);

  const {
    id,
    author_username,
    title,
    content,
    createdAt,
    updatedAt,
    subreddit_name,
    votes,
    user_vote,
  } = post;

  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  useEffect(() => {
    const postId = location.pathname.split("/")[4];
    getFullPost(parseInt(postId));
  }, [getFullPost, location.pathname]);

  const handleComment = () => {
    if (textEditor[0].children[0].text === "") return;
    const serialized: string[][] = [];
    textEditor.forEach((node: Node) => {
      serialized.push(HTMLSerializer(node));
    });

    const formatted = serialized.map((arr) => {
      return arr.join("||");
    });

    comment(id, formatted);
  };

  return (
    <div className="homepage-container full-post-container">
      <div className="post">
        <div className="full-post-votes-container">
          <Vote
            id={id}
            votes={votes}
            user_vote={user_vote}
            voteFullPost={vote}
            showCount={true}
            child={false}
          />
        </div>
        <div className="main-content">
          <div className="info">
            <div className="subreddit" title="subreddit-name">
              <NavLink to={`/r/${subreddit_name}`}>r/{subreddit_name}</NavLink>
              &nbsp;
            </div>
            <div className="posted-by" title="posted-by">
              Posted by{" "}
              <NavLink to={`/u/${author_username}`}>
                u/{author_username}
              </NavLink>
            </div>
            &nbsp;
            {createdAt ? (
              <div className="date">{formatDate(updatedAt)}</div>
            ) : null}
          </div>
          <div className="title">{title}</div>
          <div
            className="content"
            dangerouslySetInnerHTML={sanitizeContent(content)}
          />
          <div className="bottom-bar" title="bottom-bar">
            <div className="comments bottom-bar-container">
              <i className="fa fa-comment  bottom-bar-icon" />
              <div className="text">X comments</div>
            </div>
            <div className="save bottom-bar-container">
              <i className="fa fa-bookmark bottom-bar-icon" />
              <div className="text">Save</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="create-comment-container"
        title="create-comment-container"
      >
        <small>
          Comment as{" "}
          <NavLink to={`/u/${user.username}`}>{user.username}</NavLink>
        </small>
        <div className="text-editor-container">
          {process.env.NODE_ENV !== "test" ? (
            <TextEditor
              value={textEditor}
              setValue={setTextEditor}
              topBar={false}
              placeholder="What are your thoughts?"
              comment={handleComment}
            />
          ) : null}
        </div>
      </div>
      <CommentsConnector />
    </div>
  );
};

export default FullPostView;
