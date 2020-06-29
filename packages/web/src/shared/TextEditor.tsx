import { useMemo, useCallback } from "react";
import "./TextEditor.scss";
import {
  withReact,
  DefaultElement,
  Slate,
  Editable,
  ReactEditor,
} from "slate-react";
import { createEditor, Editor, Transforms, Node } from "slate";
import React from "react";

interface Props {
  setValue: (newValue: any) => void;
  value: any;
  topBar: boolean;
  placeholder: string;
  cancel?: React.Dispatch<React.SetStateAction<boolean>>;
  comment?: () => void;
}

const TextEditor = (props: Props) => {
  const { setValue, value, topBar, placeholder, comment, cancel } = props;

  const editor = useMemo(() => withReact(createEditor()), []);
  const LIST_TYPES = ["bulleted-list", "numbered-list"];
  const CustomEditor = {
    isBlockActive(editor: Editor & ReactEditor, format: string) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === format,
      });

      return !!match;
    },

    toggleBlock(editor: Editor & ReactEditor, format: string) {
      const isActive = this.isBlockActive(editor, format);
      const isList = LIST_TYPES.includes(format);

      Transforms.unwrapNodes(editor, {
        match: (n: Node) => LIST_TYPES.includes(n.type as string),
        split: true,
      });

      Transforms.setNodes(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      });

      if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
      }
    },

    toggleMark(editor: Editor & ReactEditor, format: string) {
      const isActive = this.isMarkActive(editor, format);

      if (isActive) {
        Editor.removeMark(editor, format);
      } else {
        Editor.addMark(editor, format, true);
      }
    },

    isMarkActive(editor: Editor & ReactEditor, format: string) {
      const marks = Editor.marks(editor);
      return marks ? marks[format] === true : false;
    },
  };

  const CodeElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const QuoteElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <blockquote>{props.children}</blockquote>
      </pre>
    );
  };

  const BulletElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <ul>{props.children}</ul>
      </pre>
    );
  };

  const NumberElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <ol>{props.children}</ol>
      </pre>
    );
  };

  const ListItem = (props: any) => {
    return (
      <pre {...props.attributes}>
        <li>{props.children}</li>
      </pre>
    );
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "block-quote":
        return <QuoteElement {...props} />;
      case "bulleted-list":
        return <BulletElement {...props} />;
      case "numbered-list":
        return <NumberElement {...props} />;
      case "list-item":
        return <ListItem {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const Leaf = (props: any) => {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          fontStyle: props.leaf.italic ? "italic" : "normal",
          textDecoration: props.leaf.strikethrough ? "line-through" : "none",
        }}
      >
        {props.children}
      </span>
    );
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const buttonContainer = (
    <div className="text-editor-button-container">
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, "bold");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isMarkActive(editor, "bold") ? "#000000" : "#878a8c"
          }
        >
          <path d="M12.44,9.72v0a3.07,3.07,0,0,0,2.67-3.22c0-2.84-2.42-3.46-5-3.46H4.51V17H10.4c2.61,0,5.09-1,5.09-3.86C15.49,10.91,14.14,10,12.44,9.72ZM7.54,5.38H9.85c1.65,0,2.31.61,2.31,1.7s-.74,1.68-2.35,1.68H7.54ZM10,14.65H7.54V10.95H9.89c1.7,0,2.59.61,2.59,1.83S11.72,14.65,10,14.65Z"></path>
        </svg>
      </button>

      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, "italic");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isMarkActive(editor, "italic") ? "#000000" : "#878a8c"
          }
        >
          <polygon points="7.24 17 10.3 17 12.1 6.85 9.05 6.85 7.24 17"></polygon>
          <polygon points="9.7 3 9.28 5.46 12.34 5.46 12.76 3 9.7 3"></polygon>
        </svg>
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleMark(editor, "strikethrough");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isMarkActive(editor, "strikethrough")
              ? "#000000"
              : "#878a8c"
          }
        >
          <path d="M11.86,12a1.36,1.36,0,0,1,.7,1.19c0,1.07-1,1.59-2.42,1.59a4.12,4.12,0,0,1-3.75-2.36L4.08,13.79A6.21,6.21,0,0,0,10,17.2c3.86,0,5.55-2,5.55-4.22a4,4,0,0,0-.12-1Z"></path>
          <path d="M17,9H11.61l-1.09-.31c-1.82-.51-2.85-.9-2.85-2,0-.82.71-1.39,2-1.39a4.13,4.13,0,0,1,3.41,2L15.2,5.65A6.23,6.23,0,0,0,9.69,2.8c-3,0-5,1.56-5,4.14A3.31,3.31,0,0,0,5.31,9H3a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Z"></path>
        </svg>
      </button>

      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, "code");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isBlockActive(editor, "code") ? "#000000" : "#878a8c"
          }
        >
          <path d="M18.8,9.4l-3-4a1,1,0,1,0-1.6,1.2L16.75,10,14.2,13.4a1,1,0,1,0,1.6,1.2l3-4A1,1,0,0,0,18.8,9.4Z"></path>
          <path d="M5.6,5.2a1,1,0,0,0-1.4.2l-3,4a1,1,0,0,0,0,1.2l3,4a1,1,0,0,0,1.6-1.2L3.25,10,5.8,6.6A1,1,0,0,0,5.6,5.2Z"></path>
          <path d="M12.24,1A1,1,0,0,0,11,1.76l-4,16A1,1,0,1,0,9,18.24l4-16A1,1,0,0,0,12.24,1Z"></path>
        </svg>
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, "bulleted-list");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isBlockActive(editor, "bulleted-list")
              ? "#000000"
              : "#878a8c"
          }
        >
          <path d="M17,9H8a1,1,0,0,0,0,2h9a1,1,0,0,0,0-2Z"></path>
          <path d="M17,15H8a1,1,0,0,0,0,2h9a1,1,0,0,0,0-2Z"></path>
          <path d="M8,5h9a1,1,0,0,0,0-2H8A1,1,0,0,0,8,5Z"></path>
          <path d="M4.88,9.43a1.29,1.29,0,0,0-.13-.26,2.17,2.17,0,0,0-.19-.23,1.55,1.55,0,0,0-2.12,0,2.16,2.16,0,0,0-.19.23,2.2,2.2,0,0,0-.14.26A2.3,2.3,0,0,0,2,9.71,1.32,1.32,0,0,0,2,10a1.5,1.5,0,0,0,1.5,1.5,1.55,1.55,0,0,0,.57-.11A1.52,1.52,0,0,0,5,10a1.32,1.32,0,0,0,0-.29A1.27,1.27,0,0,0,4.88,9.43Z"></path>
          <path d="M4.33,14.75l-.26-.14-.28-.08a1.42,1.42,0,0,0-.58,0l-.28.08-.26.14a2.16,2.16,0,0,0-.23.19A1.52,1.52,0,0,0,2,16a1.47,1.47,0,0,0,.44,1.06,1.52,1.52,0,0,0,.49.33,1.53,1.53,0,0,0,1.14,0,1.61,1.61,0,0,0,.49-.33A1.52,1.52,0,0,0,5,16a1.5,1.5,0,0,0-.44-1.06A2.06,2.06,0,0,0,4.33,14.75Z"></path>
          <path d="M2.44,2.94A1.52,1.52,0,0,0,2,4a1.47,1.47,0,0,0,.44,1.06,1.59,1.59,0,0,0,.48.33,1.65,1.65,0,0,0,.58.11,1.55,1.55,0,0,0,.57-.11,1.5,1.5,0,0,0,.49-.33,1.5,1.5,0,0,0,0-2.12A1.55,1.55,0,0,0,2.44,2.94Z"></path>
        </svg>
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, "numbered-list");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isBlockActive(editor, "numbered-list")
              ? "#000000"
              : "#878a8c"
          }
        >
          <path d="M4.78,5.15H4.15V2H3.09a1,1,0,0,1-.73.25V3a1.84,1.84,0,0,0,.7-.17V5.15H2.35V6H4.78Z"></path>
          <path d="M3.62,8.88c.25,0,.39.12.39.35s-.17.41-.77.78c-1,.63-1.15,1.21-1.15,1.78V12H5v-.85H3.31c.06-.16.22-.35.72-.64.81-.43,1-.87,1-1.32C5,8.47,4.58,8,3.65,8A1.76,1.76,0,0,0,2.08,9l.72.52A1.07,1.07,0,0,1,3.62,8.88Z"></path>
          <path d="M4.43,15.87A.82.82,0,0,0,5,15.05C5,14.4,4.53,14,3.65,14a2.15,2.15,0,0,0-1.51.61l.55.64a1.24,1.24,0,0,1,.88-.39c.27,0,.41.12.41.32s-.15.38-.67.38H3v.72h.31c.53,0,.76.13.76.46s-.15.42-.57.42a1.05,1.05,0,0,1-.85-.5L2,17.21A1.83,1.83,0,0,0,3.57,18c.94,0,1.55-.43,1.55-1.24A.87.87,0,0,0,4.43,15.87Z"></path>
          <path d="M17,9H8a1,1,0,0,0,0,2h9a1,1,0,0,0,0-2Z"></path>
          <path d="M17,15H8a1,1,0,0,0,0,2h9a1,1,0,0,0,0-2Z"></path>
          <path d="M8,5h9a1,1,0,0,0,0-2H8A1,1,0,0,0,8,5Z"></path>
        </svg>
      </button>
      <button
        onMouseDown={(event) => {
          event.preventDefault();
          CustomEditor.toggleBlock(editor, "block-quote");
        }}
        className={topBar ? "text-editor-button" : "text-editor-button-small"}
      >
        <svg
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px" }}
          fill={
            CustomEditor.isBlockActive(editor, "block-quote")
              ? "#000000"
              : "#878a8c"
          }
        >
          <polygon points="8.63 4 5.36 4 2 9.8 2 16 9.2 16 9.2 9.24 6.75 9.24 8.63 4"></polygon>
          <polygon points="15.56 9.24 17.39 4 14.16 4 10.8 9.8 10.8 16 18 16 18 9.24 15.56 9.24"></polygon>
        </svg>
      </button>
      {!topBar && comment && cancel ? (
        <React.Fragment>
          <button
            className="sidebar-main-button text-editor-comment-button"
            onClick={() => cancel(false)}
            disabled={!(value[0].children[0].text === "")}
          >
            {" "}
            CANCEL
          </button>
          <button
            className="sidebar-secondary-button text-editor-comment-button"
            onClick={comment}
            disabled={!(value[0].children[0].text === "")}
          >
            {" "}
            REPLY
          </button>
        </React.Fragment>
      ) : null}
      {!topBar && comment && !cancel ? (
        <button
          className="sidebar-secondary-button text-editor-comment-button"
          onClick={comment}
          disabled={!(value[0].children[0].text === "")}
        >
          {" "}
          COMMENT
        </button>
      ) : null}
    </div>
  );

  return (
    <Slate
      className="text-editor-main"
      editor={editor}
      value={value}
      onChange={(value) => setValue(value)}
    >
      <div
        className={
          topBar
            ? "text-editor-main-container"
            : "text-editor-main-container-comment"
        }
      >
        {topBar ? buttonContainer : null}
        <Editable
          className={
            cancel ? "text-editor-editable-small" : "text-editor-editable"
          }
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            switch (event.key) {
              case "`": {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, "code");
                break;
              }

              case "b": {
                event.preventDefault();
                CustomEditor.toggleMark(editor, "bold");
                break;
              }

              case "i": {
                event.preventDefault();
                CustomEditor.toggleMark(editor, "italic");
                break;
              }

              case "s": {
                event.preventDefault();
                CustomEditor.toggleMark(editor, "strikethrough");
                break;
              }

              case "q": {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, "block-quote");
                break;
              }

              case "u": {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, "bulleted-list");
                break;
              }

              case "o": {
                event.preventDefault();
                CustomEditor.toggleBlock(editor, "numbered-list");
                break;
              }
            }
          }}
        />
      </div>
      {topBar ? null : buttonContainer}
    </Slate>
  );
};

export default TextEditor;
