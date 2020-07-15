import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { subredditResponseMessages } from "./responseMessages/subreddit";
import { requireLogin } from "../middleware/requireLogin";
import { User_Subreddit } from "../models/User_Subreddit";
import { Op } from "sequelize";
import { getSubreddit, findCurrentUser, createSub } from "../helpers";
import { Vote } from "../models/Vote";
import sequelize from "../models";
import {
  getSubredditSignedInQuery,
  getSubredditPostsSignedInQuery,
} from "./queries/SubredditQueries";

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
          SubredditName: subreddit.name,
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
    const subreddit = await getSubreddit(name); //solved with query
    const user = await findCurrentUser(req.user);
    let subredditResult;
    if (user instanceof User) {
      try {
        const subredditQuery = await getSubredditSignedInQuery(
          user.username,
          name
        );

        const {
          sub_name,
          owner_id,
          topics,
          description,
          adultContent,
          joined,
          createdAt,
          updatedAt,
          mods,
          role,
        } = subredditQuery[0][0];

        let isUserJoined = false;

        if (role) {
          isUserJoined = true;
        }

        subredditResult = {
          name: sub_name,
          owner_id,
          topics,
          description,
          adultContent,
          joined,
          createdAt,
          mods,
          isUserJoined,
        };
      } catch (error) {
        return res.status(501).json({ message: server_error });
      }

      try {
        const postQuery = await getSubredditPostsSignedInQuery(user.id, name);

        subredditResult = { ...subredditResult, ...{ posts: postQuery[0] } };
        return res.status(201).json(subredditResult);
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: server_error });
      }
    }

    return res.status(404).json({ message: server_error });
  }

  @get("/test")
  async test(_req: Request, res: Response) {
    const sub = await getSubreddit("nodejs");

    if (sub instanceof Subreddit) {
      const modsArray: string[] = [];
      const mods = await User_Subreddit.findAll({
        where: {
          SubredditName: sub.name,
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

      return res.json(modsArray);
    }
    return res.end();
  }

  @post("/joinOrLeave")
  @use(requireLogin)
  async joinOrLeaveSubreddit(req: Request, res: Response) {
    const { subName } = req.body;
    console.log(subName);
    const user = await findCurrentUser(req.user);
    if (user instanceof User) {
      let userFollow;
      try {
        userFollow = await User_Subreddit.findOne({
          where: {
            username: user.username,
            SubredditName: subName,
          },
        });
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "Internal Server Error" });
      }

      if (userFollow) {
        try {
          await User_Subreddit.destroy({
            where: {
              username: user.username,
              SubredditName: subName,
            },
          });
        } catch (error) {
          console.log(error);
          return res.status(501).json({ message: "Internal Server Error" });
        }

        return res
          .status(201)
          .json({ message: "Not Joined Anymore", userJoined: false });
      } else {
        try {
          await User_Subreddit.create({
            UserId: user.id,
            SubredditName: subName,
            role: "usr",
            username: user.username,
          });
          return res
            .status(201)
            .json({ message: "User succesfully joined", userJoined: true });
        } catch (error) {
          console.log(error);
          return res.status(501).json({ message: "Internal Server Error" });
        }
      }
    }

    return res.status(501).json({ message: "Internal Server Error" });
  }
}
