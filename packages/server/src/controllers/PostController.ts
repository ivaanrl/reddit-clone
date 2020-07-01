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
import uniqid from "uniqid";
import sequelize from "../models";
import { getChildren, CommentWithReply } from "../helpers/post";

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
        const id = uniqid();
        const newComment = await user.createComment({
          path: `${post.id}.${id}`,
          id,
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
        let postComments: Comment[];
        let postsWithChildren: CommentWithReply[];
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

          //postComments = await post.getComments();
          postComments = (
            await sequelize.query(`
          SELECT * FROM comments WHERE path <@ '${post.id}'
          `)
          )[0] as Comment[];

          let maxPathLength = -1;

          const postCommentsWithReplies = postComments.map((comment) => {
            comment.path = (comment.path as string).split(".");
            if (comment.path.length > maxPathLength) {
              maxPathLength = comment.path.length;
            }

            const {
              path,
              author_id,
              author_username,
              content,
              post_id,
              comment_id,
              createdAt,
              updatedAt,
              getVotes,
            } = comment;

            const newCommentWithReply = new CommentWithReply({ ...comment });
            newCommentWithReply.setDataValue("user_vote", 0);
            newCommentWithReply.setDataValue("voteValue", 0);
            newCommentWithReply.setDataValue("replies", []);

            return newCommentWithReply;
          });

          let user_id = "";
          if (user instanceof User) {
            user_id = user.id;
          }

          postsWithChildren = await getChildren(
            postCommentsWithReplies,
            maxPathLength,
            user_id
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
          comments: postsWithChildren,
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
        const id = uniqid();
        const newComment = await user.createComment({
          id,
          path: `${comment.path}.${id}`,
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
