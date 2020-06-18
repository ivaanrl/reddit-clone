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
    console.log("downvotes");

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
