import passport from "passport";
import { keys } from "../../config/keys";
import { User } from "../models/User";
import LocalSt from "passport-local";
import { compare, hash } from "bcrypt";
import { v4 as uuid } from "uuid";

const SALT_ROUNDS = 10;

passport.serializeUser((user: string, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (id: string, cb) => {
  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    console.log("deserialize");

    cb(null, user);
  } catch (e) {
    console.log(e);
    cb(null, null);
  }
});

passport.use(
  "local-signin",
  new LocalSt.Strategy(async (username: string, password: string, done) => {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    let match: boolean = false;
    if (user) {
      match = await compare(password, user.password);
    }

    if (match) {
      return done(null, user?.id);
    } else {
      return done(null, null);
    }
  })
);

passport.use(
  "local-signup",
  new LocalSt.Strategy(async (username: string, password: string, done) => {
    const hashedPassword = hash(password, SALT_ROUNDS);
    const id = uuid();
    let user;
    try {
      user = await User.create({
        id,
        username,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return done(null, err);
    }

    return done(null, user);
  })
);
