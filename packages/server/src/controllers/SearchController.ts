import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import { Subreddit } from "../models/Subreddit";
import { Op } from "sequelize";

@controller("/api/search")
class SearchController {
  @get("/:searchValue")
  async previewSearch(req: Request, res: Response) {
    console.log("searchh");
    const searchValue = req.params.searchValue;

    try {
      const subredditsSearchResult = await Subreddit.findAll({
        where: {
          name: {
            [Op.like]: `${searchValue}%`,
          },
        },
      });

      const searchResult = await Promise.all(
        subredditsSearchResult.map(async (subreddit) => {
          const subredditMembers = await subreddit.countUsers();
          const { name, adultContent } = subreddit;

          return { memberCount: subredditMembers, name, adultContent };
        })
      );

      console.log("aaa");
      return res.status(201).json({ searchPreviewResults: searchResult });
    } catch (error) {
      return res.status(501).json({ message: "Server error" });
    }
  }
}
