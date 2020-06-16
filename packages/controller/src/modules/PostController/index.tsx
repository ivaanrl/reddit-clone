import sanitizeHTML from "sanitize-html";

interface Props {
  children: (data: {
    sanitizeContent: (content: string[]) => { __html: string };
  }) => JSX.Element;
}

export const PostController = (props: Props) => {
  const sanitizeOptions = {
    allowedTags: [
      "blockquote",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "s",
      "strike",
      "code",
      "br",
      "div",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "name", "target"],
    },
    selfClosing: ["br"],
    allowedSchemes: ["http", "https", "ftp", "mailto"],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
    allowProtocolRelative: true,
    enforceHtmlBoundary: false,
  };

  const sanitizeContent = (content: string[]) => {
    const contentWithoutBars = content.map((line) => {
      return line.split("||");
    });

    return {
      __html: sanitizeHTML(contentWithoutBars.join("<br />"), sanitizeOptions),
    };
  };

  return props.children({ sanitizeContent });
};
