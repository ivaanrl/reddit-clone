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
    saved: boolean;
  };
  reducer: string;
  vote: (id: string, voteValue: number, index: number, reducer: string) => void;
  showSubredditName: boolean;
  save: (id: string, reducer: string, index: number) => void;
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
    saved,
  } = props.postInfo;

  const history = useHistory();

  const {
    sanitizeContent,
    formatDate,
    vote,
    showSubredditName,
    reducer,
    save,
  } = props;

  const handlePostClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log((event.target as HTMLDivElement).classList);
    if (
      (event.target as HTMLDivElement).classList.contains(
        "not-navigate-to-full-post"
      )
    ) {
      return;
    }

    history.push(`/r/${subreddit_name}/post/${id}`);
  };

  const handleSavePost = () => {
    save(id, reducer, index);
  };

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
        <div className="main-content" onClick={handlePostClick}>
          <div
            className="create-date not-navigate-to-full-post"
            title="post-create-date"
          >
            {showSubredditName ? (
              <NavLink
                to={`/r/${subreddit_name}`}
                className="post-link-to-subreddit"
              >
                r/{subreddit_name}&nbsp;
              </NavLink>
            ) : null}
            <div className="postedBy">Posted by </div>&nbsp;
            <NavLink
              to={`/u/${author_username}`}
              className="post-navlink not-navigate-to-full-post"
              data-testid="post-nav-profile"
            >
              {author_username}
            </NavLink>
            &nbsp;
            <NavLink
              to={`/r/${subreddit_name}/post/${id}`}
              className="post-navlink not-navigate-to-full-post"
              data-testid="post-date-nav-fullpost"
            >
              {formatDate(createdAt)}
            </NavLink>
          </div>
          <div
            className="title"
            title="post-title"
            data-testid="post-title-nav-fullpost"
          >
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
          {type === "image" && link ? (
            <img src={link} alt={"image for " + title} className="post-image" />
          ) : null}
        </div>
        <div className="bottom-bar not-navigate-to-full-post">
          <NavLink
            to={`/r/${subreddit_name}/post/${id}`}
            className="comments bottom-bar-container not-navigate-to-full-post"
            data-testid="post-bottombar-comment-nav-fullpost"
          >
            <i className="fa fa-comment  bottom-bar-icon not-navigate-to-full-post" />
            <div className="text not-navigate-to-full-post">
              {comment_count} comments
            </div>
          </NavLink>
          <div
            className="save bottom-bar-container not-navigate-to-full-post"
            onClick={handleSavePost}
          >
            <i
              className={`fa fa-bookmark bottom-bar-icon not-navigate-to-full-post ${
                saved ? "post-saved" : ""
              }`}
            />
            <div className="text not-navigate-to-full-post">Save</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
