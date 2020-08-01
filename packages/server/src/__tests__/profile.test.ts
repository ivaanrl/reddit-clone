import axios, { AxiosResponse } from "axios";
import faker from "faker";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "../__testHelpers__/subreddits/createSubreddit";
import { createPost } from "../__testHelpers__/posts/createPost";
import {
  subredditPost,
  subredditInfo,
} from "../__testHelpers__/interfaces/subredditTestInterfaces";
import { getSubreddit } from "../__testHelpers__/subreddits/getSubreddit";
import { votePost } from "../__testHelpers__/posts/votePost";
import { commentPost } from "../__testHelpers__/posts/commentPost";
import { authResponseMessages } from "../controllers/responseMessages/auth";

const { must_be_logged_in, not_same_user } = authResponseMessages;

let username: string, password: string, email: string;
let subName: string,
  communityTopics: string[],
  description: string,
  adultContent: boolean;
let subInfo: AxiosResponse<subredditInfo>;
let subPosts: subredditPost[];

beforeAll(async () => {
  username = faker.internet.userName();
  password = faker.internet.password();
  email = faker.internet.email();
  await loginUser(username, password, email);

  subName =
    faker.lorem.word() +
    faker.lorem.word() +
    faker.lorem.word() +
    faker.lorem.word();

  communityTopics = [
    faker.lorem.word(),
    faker.lorem.word(),
    faker.lorem.word(),
  ];
  description = faker.lorem.sentence(10);
  adultContent = faker.random.boolean();
  try {
    await createSubreddit(subName, communityTopics, description, adultContent);
  } catch (error) {
    //console.log(error);
  }

  for (let i = 0; i < 20; i++) {
    try {
      await createPost(subName);
    } catch (error) {
      // console.log(error);
    }
  }

  subInfo = await getSubreddit(subName, "new", "all_time", "0");
  subPosts = subInfo.data.posts as subredditPost[];

  for (let i = 0; i < subPosts.length; i++) {
    await commentPost(subPosts[i].id);
    if (i % 2 === 0) {
      await votePost(1, subPosts[i].id);
    } else {
      await votePost(-1, subPosts[i].id);
    }
  }
});

describe("it can load profile posts", () => {
  test("loads user created posts", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getPosts/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0" },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.posts.length).toBe(10);
    expect(res.data.hasMore).toBeTruthy();
    res.data.posts.forEach((post: subredditPost) => {
      expect(post.author_username).toBe(username);
    });
  });
});

describe("profile upvoted posts work", () => {
  test("it can load upvoted posts", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getUpvotes/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0", username },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.posts.length).toBe(5);
  });
});

describe("profile downvoted posts work", () => {
  test("it can load downvoted posts", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getDownvotes/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0", username },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.posts.length).toBe(5);
  });
});

describe("profile comments work", () => {
  test("it can load profile comments", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getProfileComments/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0", username },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.comments.length).toBeGreaterThanOrEqual(5);
  });
});

describe("throws unauthorized error accordingly", () => {
  let newUsername: string, password: string, email: string;
  beforeAll(async () => {
    await logoutUser();

    newUsername = faker.internet.userName();
    password = faker.internet.password();
    email = faker.internet.email();
    await loginUser(newUsername, password, email);
  });
  test("can't load downvoted posts if it's not your own profile", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getDownvotes/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0", username },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.success).toBeFalsy();
    expect(res.data.message).toBe(not_same_user);
  });

  test("can't load upvoted posts if it's not your own profile", async () => {
    let res;
    try {
      res = await axios.get(
        "http://localhost:5000/api/user/getUpvotes/" + username,
        {
          withCredentials: true,
          params: { order: "new", time: "all_time", page: "0", username },
        }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.success).toBeFalsy();
    expect(res.data.message).toBe(not_same_user);
  });
});
