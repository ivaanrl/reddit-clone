import sanitizeHTML from "sanitize-html";

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

export const sanitizeContent = (content: string[] | null) => {
  if (content === null) {
    return { __html: sanitizeHTML(""), sanitizeOptions };
  }
  const contentWithoutBars = content.map((line) => {
    return line.split("||").join('');
  });

  return {
    __html: sanitizeHTML(contentWithoutBars.join("<br />"), sanitizeOptions),
  };
};
