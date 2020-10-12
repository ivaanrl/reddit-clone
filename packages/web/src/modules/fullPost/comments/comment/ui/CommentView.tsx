import React, { useState, useEffect } from "react";
import "./Comment.scss";
import { Comment, State } from "@reddit-clone/controller";
import Vote from "../../../../posts/vote/Vote";
import { HTMLSerializer } from "../../../../../shared/HTMLSerializer";
import TextEditor from "../../../../../shared/TextEditor";
import { useSelector } from "react-redux";

interface Props {
  commentInfo: Comment;
  index: number;
  depth: number;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (path: string[], voteValue: number) => void;
  comment: (postId: string, content: string[]) => void;
  child: boolean;
}

const CommentView = (props: Props) => {
  const {
    commentInfo,
    index,
    sanitizeContent,
    formatDate,
    vote,
    comment,
    child,
    depth,
  } = props;
  const {
    path,
    id,
    author_username,
    content,
    updatedAt,
    voteValue,
    user_vote,
    replies,
  } = commentInfo;

  const user = useSelector((state: State) => state.auth);
  const [showComment, setShowComment] = useState(true);
  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [showTextEditor, setShowTextEditor] = useState(false);

  useEffect(() => {
    if (voteValue < 0) {
      setShowComment(false);
    }

    if (index > 3 && depth > 5) {
      setShowComment(false);
    }
  }, [depth, index, voteValue]);

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
    setShowTextEditor(false);
    setTextEditor([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]);
  };

  return (
    <div
      className={
        child ? "comment-main-container-child" : "comment-main-container"
      }
    >
      {showComment ? (
        <div className="comment-sidebar-container">
          <Vote
            path={path}
            index={index}
            votes={voteValue}
            user_vote={user_vote}
            voteComment={vote}
            showCount={false}
            child={child}
          />
          <div
            className="comment-side-line"
            onClick={() => setShowComment(false)}
          />
        </div>
      ) : (
        <div
          className={
            child ? "expand-button-container-child" : "expand-button-container"
          }
          onClick={() => setShowComment(true)}
        >
          <i className="fa fa-plus-circle  comment-expand-button" />
        </div>
      )}
      <div className="comment-container">
        <div className="comment-header">
          <div className="comment-header-username">{author_username}</div>&nbsp;
          {voteValue} points {formatDate(updatedAt)}{" "}
        </div>
        {showComment ? (
          <React.Fragment>
            <div
              className="comment-content"
              dangerouslySetInnerHTML={sanitizeContent(content)}
            />
            <div className="bottom-bar comment-bottom-bar" title="bottom-bar">
              <div
                className="comments bottom-bar-container"
                onClick={() => setShowTextEditor(!showTextEditor)}
              >
                <i className="fa fa-comment  bottom-bar-icon" />
                <div className="text">Reply</div>
              </div>
              <div className="save bottom-bar-container">
                <div className="text">Save</div>
              </div>
              {user.username === author_username ? (
              <React.Fragment>
                <div className="delete bottom-bar-container">
                  <div className="text">Edit</div>
                </div>
                <div className="delete bottom-bar-container">
                  <div className="text">Delete</div>
                </div>
              </React.Fragment>
            ) : null}
            </div>
            {process.env.NODE_ENV !== "test" && showTextEditor ? (
              <div className="editor-sideline-container">
                <div className="text-editor-side-line" />
                <div className="comment-text-editor-container">
                  <TextEditor
                    value={textEditor}
                    setValue={setTextEditor}
                    topBar={false}
                    placeholder="What are your thoughts?"
                    comment={handleComment}
                    cancel={setShowTextEditor}
                  />
                </div>
              </div>
            ) : null}

            {replies?.map((reply, index) => {
              if (reply) {
                return (
                  <CommentView
                    key={index}
                    comment={comment}
                    vote={vote}
                    formatDate={formatDate}
                    sanitizeContent={sanitizeContent}
                    index={index}
                    commentInfo={reply}
                    child={true}
                    depth={depth + 1}
                  />
                );
              } else {
                return;
              }
            })}
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default CommentView;
