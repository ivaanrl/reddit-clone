import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import passport from "passport";
import { authResponseMessages } from "./responseMessages/auth";
import { User } from "../models/User";

@controller("/api/subreddit")
class SubrredditController {
  @post("/createSubreddit")
  async createSubreddit(req: Request, res: Response) {
    const user = await findCurrentUser(req.user);
    if (user instanceof User) {
      //user.createPost
    }

    res.send(req.user);
  }
}

const findCurrentUser = async (user: any) => {
  try {
    return await User.findOne({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    return false;
  }
};
