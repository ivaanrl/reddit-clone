import { Request, Response } from "express";
import { get, controller, use, post, del } from "./decorators";
import "../services/passport";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import { requireLogin } from "../middleware/requireLogin";
import { getSubreddit, findCurrentUser } from "../helpers";
import { postResponseMessages } from "./responseMessages/post";
import { Vote } from "../models/Vote";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import uniqid from "uniqid";
import {
  getChildren,
  CommentWithReply,
  handleCreatePost,
  handleCreateImagePost,
} from "../helpers/post";
import { getCommentsWithVotesQuery } from "./queries/PostQueries";
import { Notification } from "../models/Notification";
import { Saved_Post } from "../models/Saved_Post";
import { requireSameUser } from "../middleware/requireSameUser";
import { String } from "aws-sdk/clients/cloudhsm";

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
  comment_upvoted,
} = postResponseMessages;

@controller("/api/post")
class PostController {
  @post("/createPost")
  @use(requireLogin)
  async CreatePost(req: Request, res: Response) {
    const { subName, title, content, link, type } = req.body;

    const sub = await getSubreddit(subName);
    const user = await findCurrentUser(req.user);
    if (user instanceof User && sub instanceof Subreddit) {
      try {
        const id = uniqid() + uniqid();

        const post = await handleCreatePost(
          user,
          id,
          content,
          title,
          sub,
          link,
          type
        );

        if (post) {
          return res.status(201).json({ message: post_created_successfully });
        } else {
          return res.status(401).json({ message: non_specified_error });
        }
      } catch (error) {
        //console.log("error", error);
        return res.status(401).json({ message: non_specified_error });
      }
    }
    return res.status(401).json({ message: non_specified_error });
  }

  @post("/createImagePost")
  @use(requireLogin)
  async createImagePOst(req: Request, res: Response) {
    const user = await findCurrentUser(req.user);

    if (user instanceof User) {
      const id = uniqid() + uniqid();
      const post = await handleCreateImagePost(user, id, req);

      if (post) {
        return res.status(201).json({ message: post_created_successfully });
      } else {
        return res.status(401).json({ message: non_specified_error });
      }
    }

    return res.status(401).json({ message: non_specified_error });
  }

  @post("/vote")
  @use(requireLogin)
  async VotePost(req: Request, res: Response) {
    console.log("voting");
    const { voteValue, postId, reducer } = req.body;
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
          return res
            .status(201)
            .json({ message: post_upvoted, reducerToEdit: reducer });
        } catch (error) {
          return res.status(501).json({ message: server_error });
        }
      } else {
        if (vote.value !== voteValue) {
          await vote.update({
            value: voteValue,
          });
          const message = voteValue === 1 ? post_upvoted : post_downvoted;
          return res.status(201).json({ message, reducerToEdit: reducer });
        } else {
          try {
            await Vote.destroy({
              where: {
                author_id: user.id,
                post_id: postId,
              },
            });

            return res
              .status(201)
              .json({ message: vote_removed, reducerToEdit: reducer });
          } catch (error) {
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
        //let postComments: Comment[];
        let postComments: [
          {
            path: string | string[];
            id: string;
            author_id: string;
            author_username: string;
            content: string[];
            post_id: string;
            comment_id: string;
            createdAt: string;
            updatedAt: string;
            user_vote: number;
            voteValue: number;
          }[],
          unknown[]
        ];
        let postsWithChildren: CommentWithReply[];
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
          const postVotes: Vote[] = await post.getVotes();
          postVotes.forEach((vote) => {
            voteValue += vote.value;
          });

          /*postComments = (
            await sequelize.query(`
          SELECT * FROM comments WHERE path <@ '${post.id}'
          `)
          )[0] as Comment[]; */

          postComments = await getCommentsWithVotesQuery(
            (user as User).id,
            post.id
          );

          let maxPathLength = -1;

          const postCommentsWithReplies = postComments[0].map((comment) => {
            comment.path = (comment.path as string).split(".");
            if (comment.path.length > maxPathLength) {
              maxPathLength = comment.path.length;
            }

            const newCommentWithReply = new CommentWithReply({ ...comment });
            newCommentWithReply.setDataValue("user_vote", comment.user_vote);
            newCommentWithReply.setDataValue("voteValue", comment.voteValue);
            newCommentWithReply.setDataValue("replies", []);

            return newCommentWithReply;
          });

          postsWithChildren = await getChildren(
            postCommentsWithReplies,
            maxPathLength
          );
        } catch (error) {
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
          type,
          link,
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
          type,
          link,
        });
      }
    } catch (error) {
      return res.status(404).json({ message: post_not_found });
    }
    return res.status(501).json({ message: server_error });
  }

  @post("/replyComment")
  @use(requireLogin)
  async replyComment(req: Request, res: Response) {
    const { commentId, content, subreddit_name } = req.body;

    const user = await findCurrentUser(req.user);

    const comment = await Comment.findOne({
      where: {
        id: commentId,
      },
    });

    if (user instanceof User && comment instanceof Comment) {
      try {
        const id = uniqid();
        const notificationId = uniqid();
        const newComment = await user.createComment({
          id,
          path: `${comment.path}.${id}`,
          comment_id: comment.id,
          author_username: user.username,
          post_id: comment.post_id,
          content,
        });

        if (comment.author_id !== user.id && newComment) {
          const subreddit = await Post.findOne({
            where: {
              id: (comment.path as string).split(".")[0],
            },
          });

          try {
            await Notification.create({
              id: notificationId,
              reply_id: newComment.id,
              original_id: comment.id,
              subreddit_name: subreddit?.subreddit_name,
              user_id: comment.author_id,
              read: false,
            });
          } catch (error) {
            console.log(error);
          }
        }

        if (newComment) {
          return res
            .status(201)
            .json({ message: comment_saved, reply: newComment });
        }
      } catch (error) {
        return res.status(501).json({
          message:
            "There was an issue serving your request. Please try again later.",
        });
      }
    }
    return res.status(501).json({
      message:
        "There was an issue serving your request. Please try again later.",
    });
  }

  @post("/savePost")
  @use(requireLogin)
  async savePost(req: Request, res: Response) {
    const { postId } = req.body;
    const user = await findCurrentUser(req.user);

    if (user instanceof User) {
      try {
        const isSaved = await Saved_Post.findOne({
          where: {
            user_id: user.id,
            post_id: postId,
          },
        });

        if (isSaved) {
          await isSaved.destroy();
          return res.status(204).json({ message: "Post unsaved successfully" });
        }

        const saved_post = await user.createSaved_Post({ post_id: postId });
        if (saved_post) {
          return res.status(204).json({ message: "Saved Successfully." });
        }
      } catch (error) {
        return res.status(501).json({
          message:
            "There was an issue serving your request. Please try again later.",
        });
      }
    }

    return res.status(501).json({
      message:
        "There was an issue serving your request. Please try again later.",
    });
  }

  @del("/deletePost/:postId")
  @use(requireLogin)
  async deletePost(req: Request, res: Response) {
    const postId = req.params.postId;
    try {
      const post = await Post.findOne({ where: { id: postId } });
      if (
        post instanceof Post &&
        (req.user as {
          id: string;
          username: string;
          karma: number;
          email: string;
        }).id === post.author_id
      ) {
        post.update({
          content: ["<p>[deleted]</p>"],
          author_username: "[deleted]",
          author_id: null,
          link: null,
          type: "post",
        });

        return res.status(201).json({ message: "Post deleted successfully" });
      }
    } catch (error) {
      return res
        .status(501)
        .json({ message: "There was an error deleting the post." });
    }

    return res
      .status(501)
      .json({ message: "There was an error deleting the post." });
  }

  @del("/deleteComment/:commentId")
  @use(requireLogin)
  async deleteComment(req: Request, res: Response) {
    const commentId = req.params.commentId;
    try {
      const comment = await Comment.findOne({ where: { id: commentId } });
      if (
        comment instanceof Comment &&
        (req.user as {
          id: string;
          username: string;
          karma: number;
          email: string;
        }).id === comment.author_id
      ) {
        comment.update({
          content: ["<p>[deleted]</p>"],
          author_username: "[deleted]",
          author_id: null,
        });

        return res.status(201).json({ message: "Post deleted successfully" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(501)
        .json({ message: "There was an error deleting the post." });
    }

    return res
      .status(501)
      .json({ message: "There was an error deleting the post." });
  }
}
