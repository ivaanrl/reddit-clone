import { User } from "../models/User";
import { subredditResponseMessages } from "../controllers/responseMessages/subreddit";

const {
  server_error,
  name_taken,
  subreddit_created_successfully,
} = subredditResponseMessages;

export const findCurrentUser = async (user: any) => {
  try {
    return await User.findOne({
      where: {
        id: user.id,
      },
    });
  } catch (error) {
    //console.log(error);
    return { error: server_error };
  }
};
