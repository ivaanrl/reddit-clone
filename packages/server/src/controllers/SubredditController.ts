import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";

@controller("/api/subreddit")
class SubrredditController {
  @post("/createSubreddit")
  async createSubreddit(req: Request, res: Response) {
    const { name, communityTopics, description, adultContent } = req.body;
    const user = await findCurrentUser(req.user);
    if (user instanceof User) {
      const subreddit = await createSub(
        user.id,
        name,
        communityTopics,
        description,
        adultContent
      );
      if (subreddit) {
        res
          .status(201)
          .json({ success: true, message: "Subreddit created succesfully" });
        return;
      }
    }
    res.status(501).json({ success: false, message: "Internal server error" });
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

const createSub = async (
  userid: string,
  name: string,
  topics: string[],
  description: string,
  adultContent: boolean,
  privateSub: boolean = false
) => {
  try {
    const subreddit = Subreddit.create({
      owner_id: userid,
      name,
      topics,
      description,
      adultContent,
      private: privateSub,
    });
    return subreddit;
  } catch (error) {
    return false;
  }
};
