import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { keys } from "../config/keys";
import "./controllers/LoginController";
import "./controllers/SubredditController";
import "./controllers/PostController";
import "./controllers/UserController";
import "./controllers/SearchController";
import "./controllers/HomePageController";
import { AppRouter } from "./AppRouter";
import { initDB } from "../config/initDB";
import cpg from "connect-pg-simple";
import { Pool } from "pg";
import aws from "aws-sdk";

export const startServer = async () => {
  const app = express();

  const { cookieSecret, AWS_ACCESS_KEY, AWS_BUCKET, AWS_SECRET_KEY } = keys();

  let whitelist = "https://dev.mylocalsite.com:3000";
  whitelist =
    process.env.NODE_ENV === "test"
      ? (whitelist = "http://localhost")
      : whitelist;

  const corsOptions = {
    origin: whitelist,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.options("*", cors());

  app.use(express.json());

  const pool = new Pool({
    user: "ivanrl",
    password: "73442332",
    database: "reddit",
  });

  if (process.env.NODE_ENV === "development") {
    app.use(
      session({
        store: new (cpg(session))({ pool }),
        secret: cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
        },
      })
    );
  } else {
    app.use(
      session({
        secret: cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
        },
      })
    );
  }

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(AppRouter.getInstance());

  await initDB();

  let port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log("Listening on port ", port);
  });

  return app;
};
