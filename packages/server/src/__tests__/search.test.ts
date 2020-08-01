import axios from "axios";
import faker from "faker";
import { loginUser } from "../__testHelpers__/auth/loginUser";
import { logoutUser } from "../__testHelpers__/auth/logoutUser";

let username: string, password: string, email: string;

beforeAll(async () => {
  username = faker.internet.userName();
  password = faker.internet.password();
  email = faker.internet.email();

  await loginUser(username, password, email);
});

describe("it gets search previews", () => {
  test("returns a list of subreddits", async () => {
    let res;
    try {
      res = await axios.get<{
        searchPreviewResults: {
          memberCount: number;
          name: string;
          adultContent: boolean;
        }[];
      }>("http://localhost:5000/api/search/a", {
        withCredentials: true,
        params: { searchValue: "a" },
      });
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(201);
    expect(res.data.searchPreviewResults.length).toBeGreaterThan(1);
    expect(res.data.searchPreviewResults[0].memberCount).toBeGreaterThan(
      res.data.searchPreviewResults[1].memberCount
    );
  });
});
