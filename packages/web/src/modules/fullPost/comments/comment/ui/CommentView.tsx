import React, { useState } from "react";
import "./Comment.scss";
import { Comment } from "@reddit-clone/controller/dist/modules/Redux/reducers/post";
import Vote from "../../../../posts/vote/Vote";

interface Props {
  commentInfo: Comment;
  index: number;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: number, voteValue: number) => void;
  comment: (postId: number, content: string[]) => void;
}

const CommentView = (props: Props) => {
  const {
    commentInfo,
    index,
    sanitizeContent,
    formatDate,
    vote,
    comment,
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
  } = commentInfo;

  const [showComment, setShowComment] = useState(true);

  return (
    <div className="comment-main-container">
      {showComment ? (
        <div className="comment-sidebar-container">
          <Vote
            id={id}
            index={index}
            votes={voteValue}
            user_vote={user_vote}
            vote={vote}
            showCount={false}
          />
          <div
            className="comment-side-line"
            onClick={() => setShowComment(false)}
          />
        </div>
      ) : (
        <div
          className="expand-button-container"
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
              <div className="comments bottom-bar-container">
                <i className="fa fa-comment  bottom-bar-icon" />
                <div className="text">Reply</div>
              </div>
              <div className="save bottom-bar-container">
                <div className="text">Save</div>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default CommentView;
