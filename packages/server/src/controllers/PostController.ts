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
import { Comment } from "../models/Comment";

const {
  post_created_successfully,
  server_error,
  non_specified_error,
  comment_saved,
  vote_removed,
  post_downvoted,
  post_upvoted,
  post_not_found,
  error_getting_post,
} = postResponseMessages;

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
          return res.status(201).json({ message: post_created_successfully });
        } else {
          return res.status(401).json({ message: non_specified_error });
        }
      } catch (error) {
        return res.status(401).json({ message: non_specified_error });
      }
    }
    return res.status(401).json({ message: non_specified_error });
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
        return res.status(501).json({ message: server_error });
      }

      if (!(vote instanceof Vote)) {
        try {
          await user.createVote({
            value: voteValue,
            post_id: postId,
          });

          return res.status(201).json({ message: post_upvoted });
        } catch (error) {
          return res.status(501).json({ message: server_error });
        }
      } else {
        if (vote.value !== voteValue) {
          await vote.update({
            value: voteValue,
          });
          const message = voteValue === 1 ? post_upvoted : post_downvoted;
          return res.status(201).json({ message });
        } else {
          try {
            await Vote.destroy({
              where: {
                author_id: user.id,
                post_id: postId,
              },
            });

            return res.status(201).json({ message: vote_removed });
          } catch (error) {
            console.log(error);
            return res.status(501).json({ message: server_error });
          }
        }
      }
    }
    return res.status(501).json({ message: server_error });
  }

  @post("/comment")
  @use(requireLogin)
  async createComment(req: Request, res: Response) {
    const { postId, content } = req.body;
    console.log(req.body);
    const user = await findCurrentUser(req.user);
    const post = await Post.findOne({ where: { id: postId } });

    if (user instanceof User && post instanceof Post) {
      try {
        const newComment = await user.createComment({
          post_id: post.id,
          author_username: user.username,
          content,
        });

        if (newComment) {
          return res.status(201).json({ message: comment_saved });
        }
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: server_error });
      }
    }

    return res.status(501).json({ message: server_error });
  }

  @get("/getPost/:id")
  async getPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        where: {
          id: id,
        },
      });

      if (post instanceof Post) {
        let voteValue = 0;
        let postComments;
        let postCommentsArray;
        let user_vote = 0;
        let user = await findCurrentUser(req.user);
        if (user instanceof User) {
          const vote = await Vote.findOne({
            where: {
              author_id: user.id,
              post_id: post.id,
            },
          });

          if (vote instanceof Vote) {
            user_vote = vote.value;
          }
        }
        try {
          const postVotes = await post.getVotes();
          postVotes.forEach((vote) => {
            voteValue += vote.value;
          });

          postComments = await post.getComments();

          postCommentsArray = await Promise.all(
            postComments.map(async (comment) => {
              const {
                id,
                author_id,
                author_username,
                content,
                post_id,
                comment_id,
                createdAt,
                updatedAt,
              } = comment;
              let voteValue = 0;

              const commentVotes = await comment.getVotes();
              const commentReplies = await comment.getComments();

              commentVotes.forEach((vote) => {
                voteValue += vote.value;
              });
              let user_vote;
              if (user instanceof User) {
                user_vote = await Vote.findOne({
                  where: {
                    author_id: user.id,
                    comment_id: comment.id,
                  },
                });
              } else {
                user_vote = 0;
              }
              return {
                id,
                author_id,
                author_username,
                content,
                post_id,
                comment_id,
                createdAt,
                updatedAt,
                voteValue,
                user_vote,
                replies: commentReplies,
              };
            })
          );
        } catch (error) {
          console.log(error);
          return res.status(505).json({ message: error_getting_post });
        }

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

        return res.status(201).json({
          id,
          author_id,
          author_username,
          title,
          content,
          createdAt,
          updatedAt,
          subreddit_name,
          votes: voteValue,
          user_vote,
          comments: postCommentsArray,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: post_not_found });
    }
    return res.status(501).json({ message: server_error });
  }

  @post("/replyComment")
  @use(requireLogin)
  async replyComment(req: Request, res: Response) {
    const { commentId, content } = req.body;

    const user = await findCurrentUser(req.user);

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (user instanceof User && comment instanceof Comment) {
      try {
        const newComment = await user.createComment({
          comment_id: comment.id,
          author_username: user.username,
          content,
        });

        if (newComment) {
          return res.status(201).json({ message: comment_saved });
        }
      } catch (error) {
        console.log(error);
        return res.status(501).json({ message: server_error });
      }
    }
    return res.status(501).json({ message: server_error });
  }
}
