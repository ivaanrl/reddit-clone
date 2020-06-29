import React, { useState } from "react";
import "./Comment.scss";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";
import Vote from "../../../../posts/vote/Vote";
import { HTMLSerializer } from "../../../../../shared/HTMLSerializer";
import TextEditor from "../../../../../shared/TextEditor";

interface Props {
  commentInfo: Comment;
  index: number;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: number, voteValue: number) => void;
  comment: (postId: number, content: string[]) => void;
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
  } = props;
  const {
    id,
    author_id,
    author_username,
    content,
    post_id,
    comment_id,
    createdAt,
    updatedAt,
    voteValue,
    user_vote,
    replies,
  } = commentInfo;

  console.log(replies);

  const [showComment, setShowComment] = useState(true);
  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [showTextEditor, setShowTextEditor] = useState(false);

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
    <div
      className={
        child ? "comment-main-container-child" : "comment-main-container"
      }
    >
      {showComment ? (
        <div className="comment-sidebar-container">
          <Vote
            id={id}
            index={index}
            votes={voteValue}
            user_vote={user_vote}
            vote={vote}
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
                    comment={comment}
                    vote={vote}
                    formatDate={formatDate}
                    sanitizeContent={sanitizeContent}
                    index={index}
                    commentInfo={reply}
                    child={true}
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
