import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { HOMEPAGE_POSTS_LIMIT } from "./queries/HomePageQueries";
import { findCurrentUser } from "../helpers";
import { User } from "../models/User";
import { getHomepagePostsQuery } from "./queries/HomePageQueries";

@controller("/api/homepage")
class HomePageController {
  @get("/getPosts")
  async getHomePagePosts(req: Request, res: Response) {
    const currentUser = await findCurrentUser(req.user);
    const order = req.query.order as string;
    const sortTime = req.query.time as string;
    const page = req.query.page as string;

    let posts;
    if (currentUser instanceof User) {
      try {
        posts = await getHomepagePostsQuery(
          currentUser.username,
          currentUser.id,
          order,
          sortTime,
          parseInt(page, 10)
        );
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    } else {
      try {
        posts = await getHomepagePostsQuery(
          "",
          "",
          order,
          sortTime,
          parseInt(page, 10)
        );
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    }

    const hasMore = posts[0].length === HOMEPAGE_POSTS_LIMIT;

    console.log("yay");
    return res.status(201).json({ posts: posts[0], hasMore });
  }
}
