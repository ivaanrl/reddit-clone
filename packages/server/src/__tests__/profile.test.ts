import axios from "axios";
import faker from "faker";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";
import { createSubreddit } from "../__testHelpers__/subreddits/createSubreddit";
import { createPost } from "../__testHelpers__/posts/createPost";

let username: string, password: string, email: string;
let subName: string,
  communityTopics: string[],
  description: string,
  adultContent: boolean;

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
  description = faker.lorem.words(15);
  adultContent = faker.random.boolean();
  try {
    await createSubreddit(subName, communityTopics, description, adultContent);
  } catch (error) {
    console.log(error);
  }

  for (let i = 0; i < 20; i++) {
    try {
      await createPost(subName);
    } catch (error) {
      console.log(error);
    }
  }
});

describe("it can load profile posts", () => {
  test("", async () => {});
});
