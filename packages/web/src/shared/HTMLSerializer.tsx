import escapeHtml from "escape-html";
import { Node, Text } from "slate";
import { chdir } from "process";

export const HTMLSerializer = (node: any) => {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children: any = node.children
    ?.map((n: any) => HTMLSerializer(n))
    .join("");

  switch (node.type) {
    case "block-quote":
      const quoteNodes = formatByMark(node);
      return quoteNodes.map((node) => {
        return `<blockquote>${node}</blockquote>`;
      });
    case "paragraph":
      const nodes = formatByMark(node);
      return nodes;
    case "link":
      return `<a href="${escapeHtml(node.url as string)}">${children}</a>`;
    default:
      return children;
  }
};

const formatByMark = (node: { children: Node[] }) => {
  return node.children.map((child: Node) => {
    if (child.bold && child.italic && child.strikethrough) {
      return `<b><i><s>${child.text}</b></i></s>`;
    } else if (child.bold && child.italic) {
      return `<b><i>${child.text}</b></i>`;
    } else if (child.bold && child.strikethrough) {
      return `<b><s>${child.text}</b></s>`;
    } else if (child.italic && child.strikethrough) {
      return `<s><i>${child.text}</s></i>`;
    } else if (child.bold) {
      return `<b>${child.text}</b>`;
    } else if (child.italic) {
      return `<i>${child.text}</i>`;
    } else if (child.strikethrough) {
      return `<s>${child.text}</s>`;
    } else {
      return `<p>${child.text}</p>`;
    }
  });
};
