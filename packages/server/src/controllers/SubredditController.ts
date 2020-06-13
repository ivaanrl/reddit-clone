import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { subredditResponseMessages } from "./responseMessages/subreddit";
import { requireLogin } from "../middleware/requireLogin";
import { User_Subreddit } from "../models/User_Subreddit";
import { Op } from "sequelize";

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
        await User_Subreddit.create({
          UserId: user.id,
          SubredditId: subreddit.id,
          role: "own",
          username: user.username,
        });
        res
          .status(201)
          .json({ success: true, message: subreddit_created_successfully });
        return;
      } else if (subreddit == name_taken) {
        return res.status(401).json({ success: false, message: subreddit });
      }
    }

    return res.status(501).json({ success: false, message: server_error });
  }

  @get("/getSubreddit/:name")
  async getSubreddit(req: Request, res: Response) {
    const { name } = req.params;
    const subreddit = await getSubreddit(name);

    if (subreddit instanceof Subreddit) {
      const joined = (await subreddit.getUsers()).length;
      const {
        id,
        owner_id,
        name,
        topics,
        description,
        adultContent,
        createdAt,
      } = subreddit;
      const modsArray: string[] = [];
      const mods = await User_Subreddit.findAll({
        where: {
          SubredditId: subreddit.id,
          [Op.or]: [
            {
              role: "own",
            },
            {
              role: "adm",
            },
          ],
        },
      });

      mods.forEach((mod) => {
        modsArray.push(mod.username);
      });

      const sub = {
        id,
        owner_id,
        name,
        topics,
        description,
        adultContent,
        joined,
        createdAt,
        mods: modsArray,
      };

      return res.status(201).json(sub);
    } else if (subreddit === { error: server_error }) {
      return res.status(501).json({ success: false, message: server_error });
    }

    return res.status(404).json();
  }

  @post("/createPost")
  @use(requireLogin)
  async createPost(req: Request, res: Response) {
    console.log("hola");
    const { subName, title, content } = req.body;

    const sub = await getSubreddit(subName);
    const user = await findCurrentUser(req.user);

    console.log(subName);
    if (user instanceof User && sub instanceof Subreddit) {
      const post = await user.createPost({
        content,
        title,
        subreddit_id: sub.id,
      });

      console.log(post);
    }

    res.end();
  }

  @get("/test")
  async test(_req: Request, res: Response) {
    const sub = await getSubreddit("nodejs");

    if (sub instanceof Subreddit) {
      const modsArray: string[] = [];
      const mods = await User_Subreddit.findAll({
        where: {
          SubredditId: sub.id,
          [Op.or]: [
            {
              role: "own",
            },
            {
              role: "adm",
            },
          ],
        },
      });

      mods.forEach((mod) => {
        modsArray.push(mod.username);
      });
      console.log(mods);

      return res.json(modsArray);
    }
    return res.end();
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
  const existingSub = await getSubreddit(name);

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
    return name_taken;
  }
};

const getSubreddit = async (subName: string) => {
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
