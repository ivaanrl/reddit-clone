import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";
import { Subreddit } from "../models/Subreddit";

const {
  server_error,
  name_taken,
  subreddit_created_successfully,
} = subredditResponseMessages;

export const createSub = async (
  userid: string,
  name: string,
  topics: string[],
  description: string,
  adultContent: boolean,
  privateSub: boolean = false
) => {
  const existingSub = await getSubreddit(name);

  if (!(existingSub instanceof Subreddit)) {
    try {
      const subreddit = await Subreddit.create({
        owner_id: userid,
        name,
        topics,
        description,
        adultContent,
        private: privateSub,
      });
      return subreddit;
    } catch (error) {
      return false;
    }
  } else {
    return name_taken;
  }
};

export const getSubreddit = async (subName: string) => {
  try {
    return await Subreddit.findOne({
      where: {
        name: subName,
      },
    });
  } catch (error) {
    return { error: server_error };
  }
};
