import passport from "passport";
import { keys } from "../../config/keys";
import { User } from "../models/User";
import * as LocalSt from "passport-local";
import { compare, hash } from "bcrypt";
import { v4 as uuid } from "uuid";
import { authResponseMessages } from "../controllers/responseMessages/auth";
import { Op } from "sequelize";

const SALT_ROUNDS = 10;
const { username_taken, invalid_combination } = authResponseMessages;

passport.serializeUser((user: string, cb) => {
  cb(null, user);
});

passport.deserializeUser(
  async (
    serializedUser: {
      userid: string;
      email: string;
      karma: number;
      username: string;
    },
    cb
  ) => {
    try {
      const user = await User.findOne({
        where: {
          id: serializedUser.userid,
        },
      });
      cb(null, {
        id: user?.id,
        username: user?.username,
        karma: user?.karma,
        email: user?.email,
      });
    } catch (e) {
      console.log(e);
      cb(null, null);
    }
  }
);

passport.use(
  "local-signin",
  new LocalSt.Strategy(async (username: string, password: string, done) => {
    let user;
    try {
      user = await User.findOne({
        where: {
          username,
        },
      });
    } catch (error) {
      return done(null, null);
    }

    let match: boolean = false;
    if (user) {
      match = await compare(password, user.password);
    }

    if (match) {
      return done(null, {
        userid: user?.id,
        username: user?.username,
        email: user?.email,
        karma: user?.karma,
      });
    } else {
      return done(null, invalid_combination);
    }
  })
);

passport.use(
  "local-signup",
  new LocalSt.Strategy(
    {
      passReqToCallback: true,
    },
    async (req: any, username: string, password: string, done) => {
      try {
        const existingUser = await User.findOne({
          where: {
            [Op.or]: [
              {
                username,
              },
              { email: req.body.email },
            ],
          },
        });

        if (existingUser) {
          return done(null, username_taken);
        }
      } catch (error) {
        console.log(error);
      }

      const hashedPassword = await hash(password, SALT_ROUNDS);
      const id = uuid();
      let user;
      try {
        user = await User.create({
          id,
          username,
          password: hashedPassword,
          email: req.body.email,
        });
      } catch (err) {
        console.log(err);
        return done(null, null);
      }

      return done(null, {
        userid: user.id,
        username: user.username,
        email: user.email,
        karma: user.karma,
      });
    }
  )
);
