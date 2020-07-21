import { Comment } from "../models/Comment";
import { User } from "src/models/User";
import { Subreddit } from "src/models/Subreddit";

export class CommentWithReply extends Comment {
  public user_vote!: number;
  public voteValue!: number;
  public replies!: CommentWithReply[];
}

export const getChildren = async (
  commentsLeft: CommentWithReply[],
  pathLength: number
): Promise<CommentWithReply[]> => {
  if (pathLength < 2) {
    return commentsLeft;
  }

  for (let i = 0; i < commentsLeft.length; i++) {
    if (commentsLeft[i].path.length === pathLength) {
      for (let j = 0; j < commentsLeft.length; j++) {
        if (commentsLeft[i].comment_id === commentsLeft[j].id) {
          const newReplies = commentsLeft[j].getDataValue("replies");
          newReplies.push(commentsLeft[i]);

          newReplies.sort((a, b) =>
            a.voteValue > b.voteValue ? 1 : b.voteValue > a.voteValue ? -1 : 0
          );
          commentsLeft[j].setDataValue("replies", newReplies);
          commentsLeft.splice(i, 1);
          i--;
          break;
        }
      }
    }
  }

  return getChildren(commentsLeft, pathLength - 1);
};

export const createPost = async (
  user: User,
  id: string,
  content: string[],
  title: string,
  sub: Subreddit,
  type: string
) => {
  return await user.createPost({
    id,
    author_username: user.username,
    content,
    title,
    subreddit_name: sub.name,
    type,
  });
};

export const createLinkPost = async (
  user: User,
  id: string,
  link: string,
  title: string,
  sub: Subreddit,
  type: string
) => {
  try {
    return await user.createPost({
      id,
      author_username: user.username,
      link,
      title,
      subreddit_name: sub.name,
      type,
    });
  } catch (error) {
    return console.log(error);
  }
};

export const handleCreatePost = async (
  user: User,
  id: string,
  content: string[],
  title: string,
  sub: Subreddit,
  link: string,
  type: string
) => {
  switch (type) {
    case "post":
      return await createPost(user, id, content, title, sub, type);
    case "link":
      return await createLinkPost(user, id, link, title, sub, type);
    default:
      return await createPost(user, id, content, title, sub, type);
  }
};
