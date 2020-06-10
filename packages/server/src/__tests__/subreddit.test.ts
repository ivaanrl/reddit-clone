import axios from "axios";
import * as Str from "@supercharge/strings";
import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "src/__testHelpers__/subreddits/createSubreddit";

const {
  server_error,
  name_taken,
  subreddit_created_successfully,
} = subredditResponseMessages;
let username: string, password: string, email: string;

beforeAll(async () => {
  username = Str.random();
  password = Str.random();
  email = Str.random();
  await loginUser(username, password, email);
});

describe("create subreddit", () => {
  let name: string;
  beforeAll(async () => {
    name = Str.random();
  });

  test("creates a subreddit with valid information", async () => {
    const communityTopics = [Str.random(), Str.random()];
    const description = Str.random();
    const adultContent = false;

    const res = await axios.post(
      "http://localhost:5000/api/subreddit/createSubreddit",
      {
        name,
        communityTopics,
        description,
        adultContent,
      },
      { withCredentials: true }
    );

    expect(res.status).toBe(201);
    expect(res.data.message).toBe(subreddit_created_successfully);
  });

  test("fails to create sub with repeated name", async () => {
    const communityTopics = [Str.random(), Str.random()];
    const description = Str.random();
    const adultContent = false;

    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/subreddit/createSubreddit",
        {
          name,
          communityTopics,
          description,
          adultContent,
        },
        { withCredentials: true }
      );
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.message).toBe(name_taken);
  });
});

describe("try to access protected route", () => {
  beforeAll(async () => {
    await logoutUser();
  });

  test("can't create a new subreddit", async () => {
    const name = Str.random();
    const communityTopics = [Str.random(), Str.random()];
    const description = Str.random();
    const adultContent = false;
    let res;
    try {
      res = await axios.post(
        "http://localhost:5000/api/subreddit/createSubreddit",
        {
          name,
          communityTopics,
          description,
          adultContent,
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
