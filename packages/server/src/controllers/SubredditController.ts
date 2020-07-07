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
    const subreddit = await getSubreddit(name);
    const user = await findCurrentUser(req.user);

    if (subreddit instanceof Subreddit) {
      const joinedUsers = await subreddit.getUsers();
      const joined = joinedUsers.length;
      let isUserJoined = false;

      if (user instanceof User) {
        const user_subreddit = await User_Subreddit.findOne({
          where: {
            username: user.username,
            SubredditName: subreddit.name,
          },
        });
        if (user_subreddit) {
          isUserJoined = true;
        }
      }

      const {
        name,
        owner_id,
        topics,
        description,
        adultContent,
        createdAt,
      } = subreddit;

      const modsArray: string[] = [];
      const mods = await User_Subreddit.findAll({
        where: {
          SubredditName: subreddit.name,
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

      const posts = await subreddit.getPosts({
        order: [["createdAt", "DESC"]],
      });
      const postsArray: {
        id: string;
        author_id: string;
        title: string;
        content: string[];
        createdAt: Date;
        updatedAt: Date;
        subreddit_name: string;
      }[] = await Promise.all(
        posts.map(async (post) => {
          let userVote;
          if (user instanceof User) {
            userVote = await Vote.findOne({
              where: {
                author_id: user.id,
                post_id: post.id,
              },
            });
          }
          const votes = await post.getVotes();
          let voteValue = 0;
          votes.forEach((vote) => {
            voteValue += vote.value;
          });
          const {
            id,
            author_id,
            title,
            content,
            createdAt,
            updatedAt,
            subreddit_name,
            author_username,
          } = post;
          return {
            id,
            author_id,
            author_username,
            title,
            content,
            createdAt,
            updatedAt,
            subreddit_name,
            votes: voteValue,
            user_vote: userVote?.value,
          };
        })
      );

      const sub = {
        name,
        owner_id,
        topics,
        description,
        adultContent,
        joined,
        isUserJoined,
        createdAt,
        mods: modsArray,
        posts: postsArray,
      };

      return res.status(201).json(sub);
    } else if (subreddit === { error: server_error }) {
      return res.status(501).json({ success: false, message: server_error });
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
