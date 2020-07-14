import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import sequelize from "../models";
import { findCurrentUser } from "../helpers";
import { User } from "../models/User";

@controller("/api/homepage")
class HomePageController {
  @get("/getPosts")
  async getHomePagePosts(req: Request, res: Response) {
    const currentUser = await findCurrentUser(req.user);
    let posts;
    if (currentUser instanceof User) {
      try {
        posts = await sequelize.query(
          `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content,
                  posts."createdAt", posts."updatedAt", posts.subreddit_name, votes.vote_count, user_vote.value as user_vote
              FROM posts
              LEFT JOIN (
              SELECT votes.post_id, COALESCE (SUM(votes.value) +  1, 1) as vote_count
              FROM votes
              GROUP BY votes.post_id
              ) AS votes ON votes.post_id = posts.id
              INNER JOIN (
                  SELECT "SubredditName" as subreddit_name FROM users_subreddits
                  WHERE username = '${currentUser.username}'
                  ) AS user_subreddits ON user_subreddits.subreddit_name = posts."subreddit_name"
              LEFT JOIN (
                  SELECT value, post_id FROM votes
                  WHERE author_id = '${currentUser.id}'
              ) AS user_vote ON user_vote.post_id = posts.id
              ORDER BY (NOW() - posts."createdAt") / vote_count`
        );
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    } else {
      try {
        posts = await sequelize.query(
          `SELECT posts.id, posts.author_id, posts.author_username, posts.title, posts.content,
                    posts."createdAt", posts."updatedAt", posts.subreddit_name, votes.vote_count, user_vote.value as user_vote
                FROM posts
            LEFT JOIN (
            SELECT votes.post_id, COALESCE (SUM(votes.value) +  1, 1) as vote_count
                FROM votes
                GROUP BY votes.post_id
                ) AS votes ON votes.post_id = posts.id
            ORDER BY (NOW() - posts."createdAt") / vote_count`
        );
      } catch (error) {
        return res.status(501).json({ message: "Internal Server Error" });
      }
    }

    return res.status(201).json({ homePagePosts: posts });
  }
}
