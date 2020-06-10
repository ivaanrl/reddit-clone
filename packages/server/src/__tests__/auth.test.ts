import axios from "axios";
import { authResponseMessages } from "../controllers/responseMessages/auth";
import * as Str from "@supercharge/strings";

const {
  user_created_successfully,
  successful_login,
  invalid_combination,
  username_taken,
} = authResponseMessages;
let username: string, password: string, email: string;

beforeAll(async () => {
  username = Str.random();
  password = Str.random();
  email = Str.random();
});

describe("User can create account, and then login", () => {
  test("creates a valid user", async () => {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username: username,
      password: password,
      email,
    });
    expect(res.status).toBe(201);
    expect(res.data.message).toBe(user_created_successfully);
  });

  test("succesfully logs in with previous user", async () => {
    const res = await axios.post("http://localhost:5000/api/auth/signin", {
      username: username,
      password: password,
    });

    expect(res.status).toBe(201);
    expect(res.data.message).toBe(successful_login);
  });
});

describe("login fails with incorrect info", () => {
  test("incorrect username", async () => {
    const newUsername = Str.random();
    let res;
    try {
      res = await axios.post("http://localhost:5000/api/auth/signin", {
        username: newUsername,
        password: password,
      });
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.message).toBe(invalid_combination);
  });

  test("incorrect password", async () => {
    const newPassword = Str.random();
    let res;
    try {
      res = await axios.post("http://localhost:5000/api/auth/signin", {
        username: username,
        password: newPassword,
      });
    } catch (error) {
      res = error.response;
    }
    expect(res.status).toBe(401);
    expect(res.data.message).toBe(invalid_combination);
  });
});

describe("singup fails with repeated info", () => {
  test("repeated username", async () => {
    let res;
    try {
      res = await axios.post("http://localhost:5000/api/auth/signup", {
        username: username,
        password: password,
        email: email,
      });
    } catch (error) {
      res = error.response;
    }

    expect(res.status).toBe(401);
    expect(res.data.message).toBe(username_taken);
  });
});
