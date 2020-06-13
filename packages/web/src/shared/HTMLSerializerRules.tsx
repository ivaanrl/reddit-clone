import React from "react";

type BlockTagsType = "blockquote" | "p" | "pre";
const BLOCK_TAGS = {
  blockquote: "quote",
  p: "paragraph",
  pre: "code",
};

// Add a dictionary of mark tags.
type MarkTagsType = "em" | "strong" | "u";
const MARK_TAGS = {
  em: "italic",
  strong: "bold",
  u: "underline",
};

export const rules = [
  // Add our first rule with a deserializing function.
  {
    deserialize(el: Element, next: (node: NodeListOf<ChildNode>) => any) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase() as BlockTagsType];
      if (type) {
        return {
          object: "block",
          type: type,
          data: {
            className: el.getAttribute("class"),
          },
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object == "block") {
        switch (obj.type) {
          case "code":
            return (
              <pre>
                <code>{children}</code>
              </pre>
            );
          case "paragraph":
            return <p className={obj.data.get("className")}>{children}</p>;
          case "quote":
            return <blockquote>{children}</blockquote>;
        }
      }
    },
  },

  {
    deserialize(el: Element, next: (node: NodeListOf<ChildNode>) => any) {
      const type = MARK_TAGS[el.tagName.toLowerCase() as MarkTagsType];
      if (type) {
        return {
          object: "mark",
          type: type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj: any, children: any) {
      if (obj.object == "mark") {
        switch (obj.type) {
          case "bold":
            return <strong>{children}</strong>;
          case "italic":
            return <em>{children}</em>;
          case "strikethrough":
            return <s>{children}</s>;
        }
      }
    },
  },
];
