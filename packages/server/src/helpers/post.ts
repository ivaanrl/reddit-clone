import { Comment } from "../models/Comment";
import { User } from "../models/User";
import { Subreddit } from "../models/Subreddit";
import aws from "aws-sdk";
import fs from "fs";
import fileType from "file-type";
import bluebird from "bluebird";
import multiparty from "multiparty";
import { keys } from "../../config/keys";
import { Request } from "express";

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
  image: any,
  title: string,
  sub: Subreddit,
  type: string
) => {
  try {
    return await user.createPost({
      id,
      author_username: user.username,
      link: image,
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

aws.config.update({
  accessKeyId: keys().AWS_ACCESS_KEY,
  secretAccessKey: keys().AWS_SECRET_KEY,
});

aws.config.setPromisesDependency(bluebird);

const s3 = new aws.S3();

const uploadFile = async (buffer: any, name: string, type: any) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: keys().AWS_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return await s3.upload(params).promise();
};

export const handleCreateImagePost = async (
  /*_user: User,
  _id: string,
  _image: any,
  _title: string,
  _sub: Subreddit, */
  request: Request
) => {
  console.log("bbbbbbb");
  const form = new multiparty.Form();

  form.parse(request, async (error, _fields, files) => {
    if (error) {
      return error;
    }

    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);
      const timestamp = Date.now().toString();
      const fileName = `folder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return data;
    } catch (error) {
      return error;
    }
  });
};
