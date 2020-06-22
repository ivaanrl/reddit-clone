import axios, { AxiosResponse } from "axios";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "../__testHelpers__/subreddits/createSubreddit";
import faker from "faker";
import { postResponseMessages } from "../controllers/responseMessages/post";
import { getSubreddit } from "../__testHelpers__/subreddits/getSubreddit";
import { getUpvotes } from "../__testHelpers__/user/getUpvotes";
import { createPost } from "../__testHelpers__/posts/createPost";
import { getDownvotes } from "../__testHelpers__/user/getDownvotes";
import { Post } from "../models/Post";

const {
  post_created_successfully,
  server_error,
  non_specified_error,
  comment_saved,
  vote_removed,
  post_downvoted,
  post_upvoted,
} = postResponseMessages;

let username: string, password: string, email: string;
let subName: string,
  communityTopics: string[],
  description: string,
  adultContent: boolean;
beforeAll(async () => {
  username = faker.name.firstName();
  password = faker.internet.password();
  email = faker.internet.email();
  await loginUser(username, password, email);

  subName = faker.lorem.word();
  communityTopics = [faker.lorem.word(), faker.lorem.word()];
  description = faker.lorem.words(15);

  adultContent = faker.random.boolean();
  await createSubreddit(subName, communityTopics, description, adultContent);
});

describe("post are created", () => {
  test("with title and content", async () => {
    const title = faker.lorem.words(3);
    const content = [
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    ];
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/post/createPost",
        {
          subName,
          title,
          content,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
      console.log(error);
    }
    expect(res.status).toBe(201);
    expect(res.data.message).toBe(post_created_successfully);
  });

  test("without content", async () => {
    const title = faker.lorem.words(3);
    const res = await axios.post(
      "http://localhost:5000/api/post/createPost",
      {
        subName,
        title,
      },
      { withCredentials: true }
    );
    expect(res.status).toBe(201);
    expect(res.data.message).toBe(post_created_successfully);
  });
});

describe("can't create post with missing information", () => {
  test("missing subreddit name", async () => {
    const title = faker.lorem.words(3);
    const content = [
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    ];
    let res;

    try {
      res = await axios.post(
        "http://localhost:5000/api/post/createPost",
        {
          title,
          content,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }
    expect(res.status).toBe(401);
    expect(res.data.message).toBe(non_specified_error);
  });

  test("missing title", async () => {
    const content = [
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    ];
    let res;

    try {
      res = await axios.post(
        "http://localhost:5000/api/post/createPost",
        {
          subName,
          content,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }
    expect(res.status).toBe(401);
    expect(res.data.message).toBe(non_specified_error);
  });
});

describe("voting works", () => {
  let subInfo: AxiosResponse<{
    name: string;
    ownner_id: string;
    topics: string[];
    description: string;
    joined: boolean;
    createdAt: string;
    adultContent: boolean;
    mods: string[];
    posts: {
      id: number;
      author_id: string;
      author_username: string;
      title: string;
      content: string[];
      createdAt: string;
      updatedAt: string;
      subreddit_id: string;
      votes: number;
    }[];
  }>;
  let subPosts: {
    id: number;
    author_id: string;
    author_username: string;
    title: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    subreddit_id: string;
    votes: number;
  }[];
  beforeAll(async () => {
    await createPost(subName);
    subInfo = await getSubreddit(subName);
    subPosts = subInfo.data.posts;
  });

  test("can upvote post", async () => {
    const firstPost = subPosts[subPosts.length - 1];

    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/post/vote/" + firstPost.id,
        {
          voteValue: 1,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.message).toBe("Post upvoted");

    const upvotes = await getUpvotes();

    firstPost.votes = 1;

    expect(upvotes.data.upvotedPosts).toEqual([firstPost]);
  });

  test("can downvote post", async () => {
    const firstPost = subPosts[subPosts.length - 1];

    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/post/vote/" + firstPost.id,
        {
          voteValue: -1,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.message).toBe("Post downvoted");

    const downvotes = await getDownvotes();

    firstPost.votes = -1;

    console.log(downvotes.data);

    expect(downvotes.data.downvotedPosts).toEqual([firstPost]);
  });
});

describe("can create comment", () => {
  let subInfo: AxiosResponse<{
    name: string;
    ownner_id: string;
    topics: string[];
    description: string;
    joined: boolean;
    createdAt: string;
    adultContent: boolean;
    mods: string[];
    posts: {
      id: number;
      author_id: string;
      author_username: string;
      title: string;
      content: string[];
      createdAt: string;
      updatedAt: string;
      subreddit_id: string;
      votes: number;
    }[];
  }>;
  let subPosts: {
    id: number;
    author_id: string;
    author_username: string;
    title: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    subreddit_id: string;
    votes: number;
  }[];
  beforeAll(async () => {
    await createPost(subName);
    subInfo = await getSubreddit(subName);
    subPosts = subInfo.data.posts;
  });

  test("can comment post", async () => {
    const firstPost = subPosts[subPosts.length - 1];
    const comment = [
      faker.lorem.words(3),
      faker.lorem.words(3),
      faker.lorem.words(3),
    ];
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/post/comment/",
        {
          comment,
          postId: firstPost.id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.message).toBe(comment_saved);

    const post = await Post.findOne({ where: { id: firstPost.id } });
    const postComments = await post?.getComments();

    expect(postComments?.length).toBeGreaterThan(0);
  });
});

describe("throws unauthorized error", () => {
  let subInfo: AxiosResponse<{
    name: string;
    ownner_id: string;
    topics: string[];
    description: string;
    joined: boolean;
    createdAt: string;
    adultContent: boolean;
    mods: string[];
    posts: {
      id: number;
      author_id: string;
      author_username: string;
      title: string;
      content: string[];
      createdAt: string;
      updatedAt: string;
      subreddit_id: string;
      votes: number;
    }[];
  }>;
  let subPosts: {
    id: number;
    author_id: string;
    author_username: string;
    title: string;
    content: string[];
    createdAt: string;
    updatedAt: string;
    subreddit_id: string;
    votes: number;
  }[];

  beforeAll(async () => {
    await createPost(subName);
    subInfo = await getSubreddit(subName);
    subPosts = subInfo.data.posts;
    await logoutUser();
  });

  test("create post", async () => {
    const title = faker.lorem.words(3);
    const content = [
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
      faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    ];

    let res;

    try {
      res = await axios.post(
        "http://localhost:5000/api/post/createPost",
        {
          subName,
          title,
          content,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.message).toBe(
      "You must be logged in to perform this action"
    );
  });

  test("can comment post", async () => {
    const firstPost = subPosts[subPosts.length - 1];
    const comment = [
      faker.lorem.words(3),
      faker.lorem.words(3),
      faker.lorem.words(3),
    ];
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/post/comment/",
        {
          comment,
          postId: firstPost.id,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.message).toBe(
      "You must be logged in to perform this action"
    );
  });
});
