import e, { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { requireLogin } from "../middleware/requireLogin";
import { findCurrentUser } from "../helpers";
import { Vote } from "../models/Vote";
import { Post } from "../models/Post";
import { requireSameUser } from "../middleware/requireSameUser";
import sequelize from "../models";
import {
  getProfilePostsQuery,
  getProfileUpvotesQuery,
  getProfileDownvotesByNewQuery,
} from "./queries/UserProfileQueries";

@controller("/api/user")
class UserController {
  @get("/getProfile/:username")
  async getProfile(req: Request, res: Response) {
    const username = req.params.username;

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
    const order = req.query.order as string;
    const sortTime = req.query.time as string;

    let user;
    const currentUser = await findCurrentUser(req.user);
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const userPosts = await getProfilePostsQuery(
          (currentUser as User).id,
          user.id,
          order,
          sortTime
        );

        return res.status(201).json({ posts: userPosts[0] });
      } catch (error) {
        return res.status(501).json({ message: "Server internal error" });
      }
    } else {
      return; //no error because 'getProfile' already throws one for user not found
    }
  }

  @get("/getUpvotes/:username")
  @use(requireLogin)
  @use(requireSameUser)
  async getUpvotes(req: Request, res: Response) {
    const username = req.params.username;
    const order = req.query.order as string;
    const sortTime = req.query.time as string;

    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const upvotedPosts = await getProfileUpvotesQuery(
          user.id,
          order,
          sortTime
        );

        console.log(upvotedPosts[0]);

        return res.status(201).json({ posts: upvotedPosts[0] });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }

  @get("/getDownvotes/:username")
  @use(requireLogin)
  @use(requireSameUser)
  async getDownvotes(req: Request, res: Response) {
    const username = req.params.username;

    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const downvotedPosts = await getProfileDownvotesByNewQuery(user.id);

        return res.status(201).json({ posts: downvotedPosts[0] });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }

  @get("/getProfileComments/:username")
  async getComment(req: Request, res: Response) {
    const username = req.params.username;
    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      const userComments = await user.getComments({
        order: [["createdAt", "DESC"]],
      });

      try {
        const userCommentsWithParentComment = await Promise.all(
          userComments.map(async (comment) => {
            const commentVotes = await comment.getVotes();
            let commentVoteValue = 0;
            commentVotes.forEach((vote) => {
              commentVoteValue += vote.value;
            });

            const parentPost = await Post.findOne({
              where: { id: comment.post_id },
            });

            return {
              commentId: comment.id,
              commentAuthorId: comment.author_id,
              commentAuthorUsername: comment.author_username,
              commentContent: comment.content,
              commentCreatedAt: comment.createdAt,
              commentVoteValue,
              postId: parentPost?.id,
              postSubredditName: parentPost?.subreddit_name,
              postAuthorUsername: parentPost?.author_username,
              postTitle: parentPost?.title,
            };
          })
        );

        return res
          .status(201)
          .json({ comments: userCommentsWithParentComment });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }
    }

    return res.status(501).json({ message: "server error" });
  }
}
