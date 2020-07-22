import React from "react";
import "./Post.scss";
import { NavLink, useHistory } from "react-router-dom";
import Vote from "../../vote/Vote";
import { ReactTinyLink } from "react-tiny-link";

interface Props {
  sanitizeContent: (content: string[] | null) => { __html: string };
  formatDate: (date: string) => string;
  postInfo: {
    author_id: string;
    author_username: string;
    content: string[] | null;
    createdAt: string;
    updatedAt: string;
    subreddit_name: string;
    votes: string;
    title: string;
    id: string;
    user_vote: number;
    index: number;
    comment_count: number;
    link: string | null;
    type: string;
  };
  reducer: string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
  showSubredditName: boolean;
}

const PostView = (props: Props) => {
  const {
    author_username,
    content,
    createdAt,
    subreddit_name,
    votes,
    title,
    id,
    user_vote,
    index,
    comment_count,
    type,
    link,
  } = props.postInfo;

  const history = useHistory();

  const {
    sanitizeContent,
    formatDate,
    vote,
    showSubredditName,
    reducer,
  } = props;

  return (
    <div className="post-container">
      <Vote
        id={id}
        index={index}
        votes={votes}
        user_vote={user_vote}
        votePost={vote}
        showCount={true}
        child={false}
        reducer={reducer}
      />
      <div className="main-content">
        <div
          className="main-content"
          onClick={() => history.push(`/r/${subreddit_name}/post/${id}`)}
        >
          <div className="create-date" title="post-create-date">
            {showSubredditName ? (
              <NavLink
                to={`/r/${subreddit_name}`}
                className="post-link-to-subreddit"
              >
                r/{subreddit_name}&nbsp;
              </NavLink>
            ) : null}
            <div className="postedBy">Posted by </div>&nbsp;
            <NavLink to={`/u/${author_username}`} className="post-navlink">
              {author_username}
            </NavLink>
            &nbsp;
            <NavLink
              to={`/r/${subreddit_name}/post/${id}`}
              className="post-navlink"
            >
              {formatDate(createdAt)}
            </NavLink>
          </div>
          <div className="title" title="post-title">
            {title}
          </div>
          {type === "post" ? (
            <div
              className="content"
              dangerouslySetInnerHTML={sanitizeContent(content)}
              title="post-content"
            />
          ) : null}
          {type === "link" ? (
            <ReactTinyLink
              cardSize="small"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url={link}
            />
          ) : null}
        </div>
        <div className="bottom-bar">
          <NavLink
            to={`/r/${subreddit_name}/post/${id}`}
            className="comments bottom-bar-container"
          >
            <i className="fa fa-comment  bottom-bar-icon" />
            <div className="text">{comment_count} comments</div>
          </NavLink>
          <div className="save bottom-bar-container">
            <i className="fa fa-bookmark bottom-bar-icon" />
            <div className="text">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
