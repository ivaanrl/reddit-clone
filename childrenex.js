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
    replies: [
      {
        path: ["184", "x9ip6omkc1gsjcc", "x9ip6zqkc1h8zp4"],
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
        path: ["184", "x9ip6omkc1gsjcc", "ndkjfnbglkdjf"],
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
    ],
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
    replies: [
      {
        path: ["184", "x9ip6zqkc1h8cyn", "laksndlkjas"],
        id: "laksndlkjas",
        author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
        author_username: "ivanrl",
        content: ["<p>First reply ever</p>"],
        post_id: null,
        comment_id: "x9ip6zqkc1h8cyn",
        createdAt: "2020-06-30T05:15:09.112Z",
        updatedAt: "2020-06-30T05:15:09.112Z",
        replies: [
          {
            path: ["184", "x9ip6zqkc1h8cyn", "laksndlkjas", "isbdfkjhsdbfhjk"],
            id: "isbdfkjhsdbfhjk",
            author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
            author_username: "ivanrl",
            content: ["<p>NOT THIS ONEEEEEE</p>"],
            post_id: null,
            comment_id: "laksndlkjas",
            createdAt: "2020-06-30T05:15:09.112Z",
            updatedAt: "2020-06-30T05:15:09.112Z",
            replies: [],
          },
          {
            path: ["184", "x9ip6zqkc1h8cyn", "laksndlkjas", "kjahsbdjsak"],
            id: "kjahsbdjsak",
            author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
            author_username: "ivanrl",
            content: ["<p>This is the one I want to reply to</p>"],
            post_id: null,
            comment_id: "laksndlkjas",
            createdAt: "2020-06-30T05:15:09.112Z",
            updatedAt: "2020-06-30T05:15:09.112Z",
            replies: [],
          },
        ],
      },
    ],
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
];

comments.forEach((comment) => {
  comment.path = comment.path.split(",");
});

const insterIntoTree = (
  newComment,
  commentsArray,
  pathLength,
  idxPath,
  firstTry = true
) => {
  if (firstTry) {
    let currentBranch = commentsArray;
    idxPath.forEach((idx) => {
      currentBranch = currentBranch[idx];
    });

    for (let i = 0; i < currentBranch.length; i++) {
      if (currentBranch[i].path.includes(newComment.path[pathLength - 1])) {
        idxPath.push(i);
        return insterIntoTree(
          newComment,
          commentsArray,
          pathLength + 1,
          idxPath,
          false
        );
      }
    }
  } else {
    let currentBranch = commentsArray[idxPath[0]];
    for (let j = 1; j < idxPath.length; j++) {
      currentBranch = currentBranch.replies[idxPath[j]];
    }

    for (let i = 0; i < currentBranch.replies.length; i++) {
      if (
        currentBranch.replies[i].path.includes(newComment.path[pathLength - 2])
      ) {
        if (
          currentBranch.replies[i].path.length + 1 ===
          newComment.path.length
        ) {
          if (
            currentBranch.replies[i].path[
              currentBranch.replies[i].path.length - 1
            ] === newComment.path[newComment.path.length - 2]
          ) {
            idxPath.push(i);
            return insterIntoTree(
              newComment,
              commentsArray,
              pathLength + 1,
              idxPath,
              false
            );
          } else {
            continue;
          }
        } else {
          idxPath.push(i);
          return insterIntoTree(
            newComment,
            commentsArray,
            pathLength + 1,
            idxPath,
            false
          );
        }
      }
    }

    if (currentBranch.replies.length === 0) {
      currentBranch.replies.push(newComment);
    }
  }

  return commentsArray;
};

const newComment = {
  path: ["184", "x9ip6zqkc1h8cyn", "laksndlkjas", "kjahsbdjsak", "uyqwegrwuy"],
  id: "uyqwegrwuy",
  author_id: "d20dab92-03b8-4876-8b02-60f62240c58a",
  author_username: "ivanrl",
  content: ["<p>Just please work</p>"],
  post_id: null,
  comment_id: "kjahsbdjsak",
  createdAt: "2020-06-30T05:15:09.112Z",
  updatedAt: "2020-06-30T05:15:09.112Z",
  replies: [],
};

const a = insterIntoTree(newComment, comments, 2, []);
//console.log(a[1].replies[0].replies[0]);
