import React, { useState } from "react";
import "./CreatePost.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import TextEditor from "../../../shared/TextEditor";
import { HTMLSerializer } from "../../../shared/HTMLSerializer";
import SubredditDropdownConnector from "../../subredditDropdown/SubredditDropdownConnector";
import SubredditDropdownChooseCommunity from "../../../shared/svgs/SubredditDropdownChooseCommunity";
import CreatesPostNavbarConnector from "./createPostNavbar/CreatesPostNavbarConnector";

interface Props {
  createPost: (subName: string, title: string, content: string[]) => void;
}

const CreatePostView = (props: Props) => {
  const { createPost } = props;
  const sub = useSelector((state: State) => state.subreddit);
  const history = useHistory();

  const [textEditorValue, setTextEditorValue] = useState<any>([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
  const [titleValue, setTitleValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleSubmit = () => {
    const serialized: string[][] = [];
    textEditorValue.forEach((node: Node) => {
      serialized.push(HTMLSerializer(node));
    });

    const formatted = serialized.map((arr) => {
      return arr.join("||");
    });

    createPost(sub.name, titleValue, formatted);
  };

  return (
    <div className="create-post-container " title="create-post-container">
      <div className="create-post-main-title">Create a post</div>
      <div className="separator create-post-separator" />
      <CreatesPostNavbarConnector />
      <div className="create-post-select-container">
        <SubredditDropdownConnector
          isNavbarDropdown={false}
          defaultIcon={<SubredditDropdownChooseCommunity />}
          defaultText="Choose a community"
          useSameWidth={true}
          addToRedirectPath="submit"
        />
      </div>
      <div className="create-post-form-container">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={titleValue}
          onChange={handleInputChange}
        />
        <TextEditor
          value={textEditorValue}
          setValue={setTextEditorValue}
          topBar={true}
          placeholder="Text (optional)"
        />
        <div className="buttons-container">
          <button className="sidebar-main-button" onClick={handleCancel}>
            CANCEL
          </button>
          <button className="sidebar-secondary-button" onClick={handleSubmit}>
            POST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostView;
