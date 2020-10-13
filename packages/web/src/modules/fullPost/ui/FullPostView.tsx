import React, { useEffect, useState } from "react";
import "./FullPost.scss";
import { useLocation, NavLink } from "react-router-dom";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import Vote from "../../posts/vote/Vote";
import TextEditor from "../../../shared/TextEditor";
import { HTMLSerializer } from "../../../shared/HTMLSerializer";
import CommentsConnector from "../comments/CommentsConnector";
import { ReactTinyLink } from "react-tiny-link";

interface Props {
  getFullPost: (postId: string) => void;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: string, voteValue: number) => void;
  comment: (postId: string, content: string[]) => void;
  deletePost: (postId: string) => void;
}

const FullPostView = (props: Props) => {
  const location = useLocation();
  const {
    getFullPost,
    sanitizeContent,
    formatDate,
    vote,
    comment,
    deletePost,
  } = props;
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
    type,
    link,
  } = post;

  const [textEditor, setTextEditor] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  useEffect(() => {
    const postId = location.pathname.split("/")[4];
    getFullPost(postId);
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
          {type === "post" ? (
            <div
              className="content"
              dangerouslySetInnerHTML={sanitizeContent(content)}
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
          <div className="bottom-bar" title="bottom-bar">
            <div className="comments bottom-bar-container">
              <i className="fa fa-comment  bottom-bar-icon" />
              <div className="text">X comments</div>
            </div>
            <div className="save bottom-bar-container">
              <i className="fa fa-bookmark bottom-bar-icon" />
              <div className="text">Save</div>
            </div>
            {user.username === author_username ? (
              <React.Fragment>
                <div className="delete bottom-bar-container">
                  <i className="fa fa-pencil bottom-bar-icon" />
                  <div className="text">Edit</div>
                </div>
                <div
                  className="delete bottom-bar-container"
                  onClick={() => deletePost(id)}
                >
                  <i className="fa fa-trash bottom-bar-icon" />
                  <div className="text">Delete</div>
                </div>
              </React.Fragment>
            ) : null}
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
