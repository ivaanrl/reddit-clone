import React, { useState, useEffect } from "react";
import "./CreatePost.scss";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@reddit-clone/controller";
import TextEditor from "../../../shared/TextEditor";
import { HTMLSerializer } from "../../../shared/HTMLSerializer";
import SubredditDropdownConnector from "../../subredditDropdown/SubredditDropdownConnector";
import SubredditDropdownChooseCommunity from "../../../shared/svgs/SubredditDropdownChooseCommunity";
import CreatesPostNavbarConnector from "./createPostNavbar/CreatesPostNavbarConnector";
import ImageUploader from "./ImageUploader";

interface Props {
  createPost: (
    subName: string,
    title: string,
    type: string,
    content?: string[],
    link?: string
  ) => void;
  createImagePost: (post: {
    subName: string;
    title: string;
    type: string;
    image: FileList;
  }) => void;
}

const CreatePostView = (props: Props) => {
  const { createPost, createImagePost } = props;
  const sub = useSelector((state: State) => state.subreddit);
  const history = useHistory();
  const location = useLocation();

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
    switch (activeOption) {
      case "post":
        handlePostSubmit();
        break;
      case "link":
        handleLinkSubmit();
        break;
      case "image":
        handleImageSubmit();
        break;
      default:
        handlePostSubmit();
        break;
    }
  };

  const handlePostSubmit = () => {
    const serialized: string[][] = [];
    textEditorValue.forEach((node: Node) => {
      serialized.push(HTMLSerializer(node));
    });

    const formatted = serialized.map((arr) => {
      return arr.join("||");
    });

    createPost(sub.name, titleValue, "post", formatted);
  };

  const handleLinkSubmit = () => {
    createPost(sub.name, titleValue, "link", [], linkValue);
  };

  const [activeOption, setActiveOption] = useState<string>("post");

  useEffect(() => {
    const locationActiveOption = location.search.split("=")[1];
    if (locationActiveOption) {
      setActiveOption(locationActiveOption);
    } else {
      setActiveOption("post");
    }
  }, [location]);

  const [linkValue, setLinkValue] = useState("");

  const [file, setFile] = useState<FileList | null>(null);

  const handleImageSubmit = () => {
    if (!file) return;
    alert("gonna create image post");
    createImagePost({
      subName: sub.name,
      title: titleValue,
      type: "image",
      image: file,
    });
  };

  const handleLinkInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkValue(event.target.value);
  };

  return (
    <div className="create-post-container " title="create-post-container">
      <div className="create-post-main-title">Create a post</div>
      <div className="separator create-post-separator" />

      <div className="create-post-select-container">
        <SubredditDropdownConnector
          isNavbarDropdown={false}
          defaultIcon={<SubredditDropdownChooseCommunity />}
          defaultText="Choose a community"
          useSameWidth={true}
          addToRedirectPath="submit"
        />
      </div>
      <CreatesPostNavbarConnector />
      <div className="create-post-form-container">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={titleValue}
          onChange={handleInputChange}
        />
        {activeOption === "post" ? (
          <TextEditor
            value={textEditorValue}
            setValue={setTextEditorValue}
            topBar={true}
            placeholder="Text (optional)"
          />
        ) : null}
        {activeOption === "image" ? <ImageUploader setFile={setFile} /> : null}
        {activeOption === "link" ? (
          <input
            type="text"
            name="link"
            id="link"
            placeholder="Url"
            className="create-post-link-input"
            value={linkValue}
            onChange={handleLinkInputChange}
          />
        ) : null}
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
