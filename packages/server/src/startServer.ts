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
import * as https from "https";
import * as fs from "fs";
import * as path from "path";

export const startServer = async () => {
  const app = express();

  const { cookieSecret } = keys();

  const whitelist = [
    "https://dev.mylocalsite.com:3000",
    "http://localhost",
    "http://localhost:19001/",
    "http://192.168.0.45:19006/",
    "http://192.168.0.33",
    "https://192.168.0.33",
    "exp://192.168.0.45:19000",
    "http://localhost:19002/",
    /\.localhost\$/,
    /[^]*/,
  ];

  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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

  if (process.env.TS_NODE_DEV) {
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

  if (process.env.TS_NODE_DEV) {
    const httpsOptions = {
      key: fs.readFileSync(path.resolve(__dirname, "localhost.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.crt")),
    };
    const httpsServer = https.createServer(httpsOptions, app);
    httpsServer.listen(port, () => {
      console.log("Listening on port", port);
    });
  } else {
    app.listen(port, () => {
      console.log("listening", port);
    });
  }
};
