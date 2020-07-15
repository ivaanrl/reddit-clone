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
    console.log(req.user);
    const user = await findCurrentUser(req.user);

    console.log(user);
    if (user instanceof User) {
      const subredditQuery = await sequelize.query(`
      SELECT subreddits.name, subreddits.owner_id, subreddits.topics, subreddits.description,
      subreddits."adultContent", subreddits.private,subreddits."createdAt",
      subreddits."updatedAt", users_subreddits.role, subreddit_mods.mods,user_count.joined
      FROM subreddits 
      LEFT JOIN (
        SELECT COALESCE(role,'') as role, "SubredditName" FROM users_subreddits
        WHERE username='${user.username}' AND "SubredditName"='${name}'
        ) AS users_subreddits 
        ON users_subreddits."SubredditName" = subreddits.name
      INNER JOIN(
        SELECT  array_agg(username) as mods FROM users_subreddits
        WHERE role='own' OR role='adm'
        ) AS subreddit_mods 
        ON users_subreddits."SubredditName" = subreddits.name
      INNER JOIN(
        SELECT COUNT(DISTINCT username) as joined , "SubredditName"  FROM users_subreddits
        WHERE "SubredditName"='${name}'
        GROUP BY "SubredditName"
        ) AS user_count ON user_count."SubredditName" = subreddits.name
      WHERE subreddits.name='${name}'`);

      console.log("NEW SUBREDDIT", subredditQuery[0]);

      const postQuery = await sequelize.query(`
      SELECT * FROM posts
      LEFT JOIN (
        SELECT votes.post_id, COALESCE(SUM(votes.value) + 1, 1) as vote_count
        FROM votes
        GROUP BY votes.post_id
      ) AS votes on votes.post_id = posts.id
      LEFT JOIN (
        SELECT COALESCE(value,0) as user_vote, post_id FROM votes
        WHERE author_id = '${user.id}'
      ) AS user_vote ON user_vote.post_id = posts.id
      WHERE subreddit_name='${name}'`);
    }

    if (subreddit instanceof Subreddit) {
      const joinedUsers = await subreddit.getUsers(); //solved with query
      const joined = joinedUsers.length; //solved with query
      let isUserJoined = false; //solved with query ??

      if (user instanceof User) {
        //solved with query
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
        //solved with query
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
        //solved with query
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
