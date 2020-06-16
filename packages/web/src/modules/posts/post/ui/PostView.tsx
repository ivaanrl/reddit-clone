import React from "react";
import "./Post.scss";

interface Props {
  sanitizeContent: (content: string[]) => { __html: string };
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[];
    createdAt: Date;
    updatedAt: Date;
    subreddit_id: number;
    votes: number;
    title: string;
    id: number;
  };
}

const PostView = (props: Props) => {
  const {
    author_id,
    author_username,
    content,
    createdAt,
    updatedAt,
    subreddit_id,
    votes,
    title,
    id,
  } = props.postInfo;
  const { sanitizeContent } = props;

  return (
    <div className="post-container">
      <div className="create-date">
        {`Posted by  ${author_username} X hours ago`}
      </div>
      <div className="title">{title}</div>
      <div
        className="content"
        dangerouslySetInnerHTML={sanitizeContent(content)}
      />
    </div>
  );
};

export default PostView;
