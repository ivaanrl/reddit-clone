import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { subredditResponseMessages } from "./responseMessages/subreddit";
import { requireLogin } from "../middleware/requireLogin";
import { getSubreddit, findCurrentUser } from "../helpers";
import { postResponseMessages } from "./responseMessages/post";
import { Vote } from "../models/Vote";
import { Post } from "../models/Post";

@controller("/api/user")
class UserController {
  @get("/getProfile/:username")
  async getProfile(req: Request, res: Response) {
    const username = req.params.username;
    const order = req.query.order;

    try {
      const user = await User.findOne({ where: { username } });

      if (user instanceof User) {
        const { id, username, karma, createdAt } = user;
        return res.status(201).json({
          userInfo: {
            id,
            username,
            karma,
            createdAt,
          },
        });
      } else {
        return res.status(404).json({ message: "There is no such user" });
      }
    } catch (error) {
      return res.status(501).json({ message: "Internal server error" });
    }
  }

  @get("/getPosts/:username")
  async getProfilePosts(req: Request, res: Response) {
    const username = req.params.username;
    const order = req.query.order;
    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const userPosts = await user.getPosts({
          order: [["createdAt", "DESC"]],
        });

        const userPostsArray = userPosts.map((userPost) => {
          const { id, subreddit_name, title } = userPost;

          return { id, subreddit_name, title };
        });

        return res.status(201).json({ posts: userPostsArray });
      } catch (error) {
        return res.status(501).json({ message: "Server internal error" });
      }
    } else {
      return; //no error because 'getProfile' already throws one for user not found
    }
  }

  @get("/getUpvotes")
  @use(requireLogin)
  async getUpvotes(req: Request, res: Response) {
    const user = await findCurrentUser(req.user);

    if (user instanceof User) {
      try {
        const upvotes = await Vote.findAll({
          where: {
            author_id: user.id,
            value: 1,
          },
        });

        const upvotedPostsWithoutVotes = await Promise.all(
          upvotes.map(async (upvote) => {
            return await Post.findByPk(upvote.post_id);
          })
        );

        const upvotedPosts = await Promise.all(
          upvotedPostsWithoutVotes.map(async (post) => {
            if (post instanceof Post) {
              const votes = await post.countVotes();
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
                votes,
              };
            }
            return null;
          })
        );
        return res.status(201).json({ upvotedPosts });
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }

  @get("/getDownvotes")
  @use(requireLogin)
  async getDownvotes(req: Request, res: Response) {
    const user = await findCurrentUser(req.user);

    if (user instanceof User) {
      try {
        const downvotes = await Vote.findAll({
          where: {
            author_id: user.id,
            value: -1,
          },
        });

        const downvotedPostsWithoutVotes = await Promise.all(
          downvotes.map(async (downvote) => {
            return await Post.findByPk(downvote.post_id);
          })
        );

        const downvotedPosts = await Promise.all(
          downvotedPostsWithoutVotes.map(async (post) => {
            if (post instanceof Post) {
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
              };
            }
            return null;
          })
        );

        return res.status(201).json({ downvotedPosts });
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }
}
