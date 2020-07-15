import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import sequelize from "../models";
import { findCurrentUser } from "../helpers";
import { User } from "../models/User";
import { Post } from "../models/Post";
import {
  getHomepagePostsSignedInQuery,
  getHomepagePostsSignedOutQuery,
} from "./queries/HomePageQueries";

@controller("/api/homepage")
class HomePageController {
  @get("/getPosts")
  async getHomePagePosts(req: Request, res: Response) {
    const currentUser = await findCurrentUser(req.user);
    let posts;
    if (currentUser instanceof User) {
      try {
        posts = await getHomepagePostsSignedInQuery(
          currentUser.username,
          currentUser.id
        );
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    } else {
      try {
        posts = await getHomepagePostsSignedOutQuery();
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    }

    const finalPostsArray: Post[] = [];
    posts.forEach((post: any, index: number) => {
      if (posts.length - 1 !== index) {
        post[0].votes -= 1; //I added one to result to avoid dividing by 0 on postgresql. This line removes it
        finalPostsArray.push(post[0]);
      }
    });

    return res.status(201).json({ posts: finalPostsArray });
  }
}
