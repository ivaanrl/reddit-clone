import React, { useState } from "react";
import "./CreatePost.scss";
import Select, { ValueType, ActionMeta } from "react-select";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { State, allActions } from "@reddit-clone/controller";
import { getSubredditsForDropdown } from "../../../shared/getSubredditsForDropdown";
import TextEditor from "../../../shared/TextEditor";
import { HTMLSerializer } from "../../../shared/HTMLSerializer";

const CreatePostView = () => {
  const dispatch = useDispatch();
  const sub = useSelector((state: State) => state.subreddit);
  const history = useHistory();
  const user = useSelector((state: State) => state.auth);
  const subsOptions = getSubredditsForDropdown(user.userSubs, false);

  const handleSubredditDropdownChange = (
    value: ValueType<{ value: string; label: string }>,
    _actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selected = value as { value: string; label: string };
    if (selected.value === "home") {
      history.push("/submit");
    } else {
      history.push(`/r/${selected.value}/submit`);
    }
  };

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

    dispatch(
      allActions.createPost({
        subName: sub.name,
        title: titleValue,
        content: formatted,
      })
    );
  };

  return (
    <div className="create-post-container">
      <div className="create-post-main-title">Create a post</div>
      <div className="separator create-post-separator" />
      <div className="create-post-select-container">
        <Select
          className="react-select"
          classNamePrefix="react-select"
          placeholder="Select subreddit..."
          defaultValue={{
            value: "choose a community",
            label: "Choose a community",
          }}
          options={subsOptions}
          onChange={handleSubredditDropdownChange}
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
        <TextEditor value={textEditorValue} setValue={setTextEditorValue} />
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
