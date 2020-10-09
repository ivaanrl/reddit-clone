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
    "https://awesome-reddit-clone.netlify.app",
  ];

  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        console.log("accepted by cors:", origin);
        callback(null, true);
      } else {
        console.log(origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.options("*", cors());
  app.set("trust proxy", 1);

  app.use(express.json());

  if (process.env.TS_NODE_DEV) {
    const pool = new Pool({
      user: "ivanrl",
      password: "73442332",
      database: "reddit",
    });

    app.use(
      session({
        store: new (require("connect-pg-simple")(session))({ pool }),
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
    console.log("PRODUCTIONN");
    app.use(
      session({
        store: new (require("connect-pg-simple")(session))({
          conString: process.env.DATABASE_URL,
        }),
        secret: cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        },
      })
    );
  }

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(AppRouter.getInstance());

  await initDB(); //initialize necessary tables if not created

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
