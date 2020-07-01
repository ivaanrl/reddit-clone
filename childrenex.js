const comments = [
  {
    path: "184,x9ip6omkc1gsjcc",
    id: "x9ip6omkc1gsjcc",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>this is my comment</p>"],
    post_id: 184,
    comment_id: null,
    createdAt: "2020-06-30T05:02:21.419Z",
    updatedAt: "2020-06-30T05:02:21.419Z",
    replies: [],
  },
  {
    path: "184,x9ip6zqkc1h8cyn",
    id: "x9ip6zqkc1h8cyn",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>second comment ever </p>"],
    post_id: 184,
    comment_id: null,
    createdAt: "2020-06-30T05:14:39.647Z",
    updatedAt: "2020-06-30T05:14:39.647Z",
    replies: [],
  },
  {
    path: "184,x9ip6zqkc1h8o2e",
    id: "x9ip6zqkc1h8o2e",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>third comment, PS I NEED TO FIX THIS BUG</p>"],
    post_id: 184,
    comment_id: null,
    createdAt: "2020-06-30T05:14:54.038Z",
    updatedAt: "2020-06-30T05:14:54.038Z",
    replies: [],
  },
  {
    path: "184,x9ip6omkc1gsjcc,x9ip6zqkc1h8zp4",
    id: "x9ip6zqkc1h8zp4",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>First reply ever</p>"],
    post_id: null,
    comment_id: "x9ip6omkc1gsjcc",
    createdAt: "2020-06-30T05:15:09.112Z",
    updatedAt: "2020-06-30T05:15:09.112Z",
    replies: [],
  },
  {
    path: "184,x9ip6omkc1gsjcc,ndkjfnbglkdjf",
    id: "ndkjfnbglkdjf",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>First reply ever</p>"],
    post_id: null,
    comment_id: "x9ip6omkc1gsjcc",
    createdAt: "2020-06-30T05:15:09.112Z",
    updatedAt: "2020-06-30T05:15:09.112Z",
    replies: [],
  },
  {
    path: "184,x9ip6zqkc1h8cyn,laksndlkjas",
    id: "laksndlkjas",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>First reply ever</p>"],
    post_id: null,
    comment_id: "x9ip6zqkc1h8cyn",
    createdAt: "2020-06-30T05:15:09.112Z",
    updatedAt: "2020-06-30T05:15:09.112Z",
    replies: [],
  },
  {
    path: "184,x9ip6zqkc1h8cyn,laksndlkjas,kjahsbdjsak",
    id: "kjahsbdjsak",
    author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
    author_username: "ivanrl",
    content: ["<p>First reply ever</p>"],
    post_id: null,
    comment_id: "laksndlkjas",
    createdAt: "2020-06-30T05:15:09.112Z",
    updatedAt: "2020-06-30T05:15:09.112Z",
    replies: [],
  },
];

let maxPathLength = -1;

comments.forEach((comment) => {
  comment.path = comment.path.split(",");
  if (comment.path.length > maxPathLength) {
    maxPathLength = comment.path.length;
  }
});

const getChildren = (commentsLeft, pathLength) => {
  if (pathLength < 2) {
    return commentsLeft;
  }

  for (let i = 0; i < commentsLeft.length; i++) {
    if (commentsLeft[i].path.length === pathLength) {
      for (let j = 0; j < commentsLeft.length; j++) {
        if (commentsLeft[i].comment_id === commentsLeft[j].id) {
          commentsLeft[j].replies.push(commentsLeft[i]);
          commentsLeft.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  return getChildren(commentsLeft, pathLength - 1);
};

const commentsWithChilds = getChildren(comments, maxPathLength);

console.log(commentsWithChilds);
