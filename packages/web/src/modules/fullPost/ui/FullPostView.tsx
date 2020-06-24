import React, { useEffect, useState } from "react";
import "./FullPost.scss";
import { useLocation, NavLink } from "react-router-dom";
import { State } from "@reddit-clone/controller";
import { useSelector } from "react-redux";
import Vote from "../../posts/vote/Vote";
import TextEditor from "../../../shared/TextEditor";

interface Props {
  getFullPost: (postId: number) => void;
  sanitizeContent: (content: string[]) => { __html: string };
  formatDate: (date: string) => string;
  vote: (id: number, voteValue: number) => void;
}

const FullPostView = (props: Props) => {
  const location = useLocation();
  const { getFullPost, sanitizeContent, formatDate, vote } = props;
  const post = useSelector((state: State) => state.fullPost);

  const {
    id,
    author_id,
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

  return (
    <div className="homepage-container">
      <div className="post">
        <Vote id={id} votes={votes} user_vote={user_vote} voteFullPost={vote} />
        <div className="main-content">
          <div className="info">
            <div className="subreddit">
              <NavLink to={`/r/${subreddit_name}`}>r/{subreddit_name}</NavLink>
              &nbsp;
            </div>
            <div className="posted-by">
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
          <div className="bottom-bar">
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
      <div className="text-editor-container">
        <TextEditor
          value={textEditor}
          setValue={setTextEditor}
          topBar={false}
        />
      </div>
    </div>
  );
};

export default FullPostView;
