import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { subredditResponseMessages } from "./responseMessages/subreddit";
import { requireLogin } from "../../middleware/requireLogin";

const {
  server_error,
  name_taken,
  subreddit_created_successfully,
} = subredditResponseMessages;

@controller("/api/subreddit")
class SubrredditController {
  @post("/createSubreddit")
  @use(requireLogin)
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
      if (subreddit instanceof Subreddit) {
        res
          .status(201)
          .json({ success: true, message: subreddit_created_successfully });
        return;
      } else if (subreddit === { error: name_taken }) {
        res.status(401).json({ success: false, message: subreddit.error });
      }
    }

    res.status(501).json({ success: false, message: server_error });
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
    return { error: server_error };
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
  const existingSub = await isSubAvailable(name);

  if (!(existingSub instanceof Subreddit)) {
    try {
      const subreddit = await Subreddit.create({
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
  } else {
    return { error: name_taken };
  }
};

const isSubAvailable = async (subName: string) => {
  try {
    return await Subreddit.findOne({
      where: {
        name: subName,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: server_error };
  }
};
