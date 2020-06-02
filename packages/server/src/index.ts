import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { keys } from "../config/keys";
import "./controllers/LoginController";
import { AppRouter } from "./AppRouter";
import sequelize from "./models/index";

const app = express();

const { cookieSecret } = keys();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());

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

app.use(passport.initialize());
app.use(passport.session());

app.use(AppRouter.getInstance());

sequelize.sync().then(async () => {
  await sequelize.query(
    `
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY NOT DEFERRABLE INITIALLY IMMEDIATE,
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    `
  );

  await sequelize.query(
    `CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");`
  );
});

app.listen(5000, () => {
  console.log("started");
});

export default app;
