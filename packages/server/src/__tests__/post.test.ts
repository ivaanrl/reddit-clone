import axios from "axios";
import * as Str from "@supercharge/strings";
import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "../__testHelpers__/subreddits/createSubreddit";
import faker from "faker";
import { postResponseMessages } from "../controllers/responseMessages/post";

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

test("can create a post", async () => {
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
  expect(res.data.message).toBe(postResponseMessages.post_created_successfully);
});
