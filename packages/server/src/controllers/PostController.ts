import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { subredditResponseMessages } from "./responseMessages/subreddit";
import { requireLogin } from "../middleware/requireLogin";
import { getSubreddit, findCurrentUser } from "../helpers";

@controller("/api/post")
class PostController {
  @post("/createPost")
  @use(requireLogin)
  async CreatePost(req: Request, res: Response) {
    const { subName, title, content } = req.body;

    const sub = await getSubreddit(subName);
    const user = await findCurrentUser(req.user);

    if (user instanceof User && sub instanceof Subreddit) {
      try {
        const post = await user.createPost({
          content,
          title,
          subreddit_id: sub.id,
        });

        if (post) {
          return res
            .status(201)
            .json({ message: "Post created successfully." });
        } else {
          return res
            .status(501)
            .json({ message: "There was an error creating the post" });
        }
      } catch (error) {
        return res
          .status(501)
          .json({ message: "There was an error creating the post" });
      }
    }
    return res
      .status(501)
      .json({ message: "There was an error creating the post" });
  }
}
