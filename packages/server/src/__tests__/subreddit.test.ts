/*import axios from "axios";
import { startServer } from "../startServer";
import * as Str from "@supercharge/strings";
import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";
import { loginUser } from "../__test_setup__/loginUser";

const {
  server_error,
  name_taken,
  subreddit_created_successfully,
} = subredditResponseMessages;
let username: string, password: string, email: string;

beforeAll(async () => {
  await startServer();
  username = Str.random();
  password = Str.random();
  email = Str.random();
});

describe("create subreddit", () => {
  beforeAll(async () => {
    await loginUser(username, password, email);
  });

  test("creates a subreddit with valid information", async () => {
    const name = Str.random();
    const communityTopics = Str.random();
    const description = Str.random();
    const adultContent = false;

    const res = await axios.post(
      "http://localhost:5000/api/subreddit/createSubreddit",
      {
        name,
        communityTopics,
        description,
        adultContent,
      }
    );

    expect(res.status).toBe(201);
    expect(res.data.message).toBe(subreddit_created_successfully);
  });
}); */
