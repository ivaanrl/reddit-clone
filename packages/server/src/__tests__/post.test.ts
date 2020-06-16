import axios from "axios";
import * as Str from "@supercharge/strings";
import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "../__testHelpers__/subreddits/createSubreddit";
import faker from "faker";
import { postResponseMessages } from "../controllers/responseMessages/post";
import { title } from "process";

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
    const res = await axios.post(
      "http://localhost:5000/api/post/createPost",
      {
        subName,
        title,
        content,
      },
      { withCredentials: true }
    );
    expect(res.status).toBe(201);
    expect(res.data.message).toBe(
      postResponseMessages.post_created_successfully
    );
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
    expect(res.data.message).toBe(
      postResponseMessages.post_created_successfully
    );
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
    expect(res.data.message).toBe(postResponseMessages.non_specified_error);
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
    expect(res.data.message).toBe(postResponseMessages.non_specified_error);
  });
});

describe("can't create post if not signed in", () => {
  beforeAll(async () => {
    await logoutUser();
  });

  test("throws error for not being signed in", async () => {
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
});
