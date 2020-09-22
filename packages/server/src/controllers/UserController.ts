import e, { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { requireLogin } from "../middleware/requireLogin";
import { findCurrentUser } from "../helpers";
import { requireSameUser } from "../middleware/requireSameUser";
import {
  getProfilePostsQuery,
  getProfileVotedPostQuery,
  getProfileCommentsQuery,
  PROFILE_POSTS_LIMIT,
  PROFILE_VOTED_LIMIT,
  PROFILE_COMMENT_LIMIT,
  getNotificationsQuery,
} from "./queries/UserProfileQueries";
import { Notification } from "../models/Notification";

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
    const page = req.query.page as string;

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
          sortTime,
          parseInt(page, 10)
        );

        const hasMore = userPosts[0].length === PROFILE_POSTS_LIMIT;

        return res.status(201).json({ posts: userPosts[0], hasMore });
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
    const page = req.query.page as string;

    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const upvotedPosts = await getProfileVotedPostQuery(
          user.id,
          order,
          sortTime,
          1,
          parseInt(page, 10)
        );

        const hasMore = upvotedPosts[0].length === PROFILE_VOTED_LIMIT;

        return res.status(201).json({ posts: upvotedPosts[0], hasMore });
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
    const order = req.query.order as string;
    const sortTime = req.query.time as string;
    const page = req.query.page as string;

    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const downvotedPosts = await getProfileVotedPostQuery(
          user.id,
          order,
          sortTime,
          -1,
          parseInt(page, 10)
        );

        const hasMore = downvotedPosts[0].length === PROFILE_VOTED_LIMIT;

        return res.status(201).json({ posts: downvotedPosts[0], hasMore });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }

  @get("/getProfileComments/:username")
  async getComment(req: Request, res: Response) {
    const username = req.params.username;
    const order = req.query.order as string;
    const sortTime = req.query.time as string;
    const page = req.query.page as string;
    let user;
    try {
      user = await User.findOne({ where: { username } });
    } catch (error) {
      return res.status(501).json({ message: "Server internal error" });
    }

    if (user instanceof User) {
      try {
        const userCommentsWithParentComment = await getProfileCommentsQuery(
          user.id,
          order,
          sortTime,
          parseInt(page, 10)
        );

        const hasMore =
          userCommentsWithParentComment[0].length === PROFILE_COMMENT_LIMIT;
        return res
          .status(201)
          .json({ comments: userCommentsWithParentComment[0], hasMore });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }
    }
    return res.status(501).json({ message: "server error" });
  }

  @get("/getNotifications/:filter")
  @use(requireLogin)
  async getNotifications(req: Request, res: Response) {
    const { filter } = req.params;
    const user = (await findCurrentUser(req.user)) as User;
    try {
      const notifications = await getNotificationsQuery(filter, user.id);
      return res.json(notifications[0]);
    } catch (error) {
      console.log(error);
      return res.json({ message: "error" });
    }
  }

  @post("/changeNotificationStatus")
  @use(requireLogin)
  async changeNotificationStatus(req: Request, res: Response) {
    const { id } = req.body;

    const user = (await findCurrentUser(req.user)) as User;
    const notification = await Notification.findOne({ where: { id } });
    if (user instanceof User && notification instanceof Notification) {
      try {
        await notification.update({
          read: !notification.read,
        });
        return res.status(204).json({ success: { message: "" } });
      } catch (error) {
        return res
          .status(501)
          .json({ error: { message: "Server internal error" } });
      }
    }

    return res
      .status(501)
      .json({ error: { message: "Server internal error" } });
  }
}
