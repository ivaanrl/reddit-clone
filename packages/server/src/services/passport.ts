import passport from "passport";
import { keys } from "../../config/keys";
import { User } from "../models/User";

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
