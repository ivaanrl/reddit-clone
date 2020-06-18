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
          author_username: user.username,
          content,
          title,
          subreddit_name: sub.name,
        });

        if (post) {
          return res
            .status(201)
            .json({ message: postResponseMessages.post_created_successfully });
        } else {
          return res
            .status(401)
            .json({ message: postResponseMessages.non_specified_error });
        }
      } catch (error) {
        return res
          .status(401)
          .json({ message: postResponseMessages.non_specified_error });
      }
    }
    return res
      .status(401)
      .json({ message: postResponseMessages.non_specified_error });
  }

  @post("/vote/:id")
  @use(requireLogin)
  async VotePost(req: Request, res: Response) {
    const postId = parseInt(req.params.id, 10);
    const { voteValue } = req.body;

    const user = await findCurrentUser(req.user);
    if (user instanceof User) {
      let vote;
      try {
        vote = await Vote.findOne({
          where: {
            author_id: user.id,
            post_id: postId,
          },
        });
      } catch (error) {
        return res.status(501).json({ message: "server error" });
      }

      if (!(vote instanceof Vote)) {
        try {
          await user.createVote({
            value: voteValue,
            post_id: postId,
          });

          return res.status(201).json({ message: "Post upvoted" });
        } catch (error) {
          return res.status(501).json({ message: "server error" });
        }
      } else {
        if (vote.value !== voteValue) {
          await vote.update({
            value: voteValue,
          });
          const message = voteValue === 1 ? "Post upvoted" : "Post downvoted";
          return res.status(201).json({ message });
        } else {
          try {
            await Vote.destroy({
              where: {
                author_id: user.id,
                post_id: postId,
              },
            });

            return res.status(201).json({ message: "Vote removed" });
          } catch (error) {
            console.log(error);
            return res.status(501).json({ message: "server error" });
          }
        }
      }
    }
    return res.status(501).json({ message: "server error" });
  }
}
