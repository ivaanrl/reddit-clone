import axios from "axios";

export const getSubreddit = async (
  name: string,
  order: string,
  time: string,
  page: string
) => {
  let res;
  try {
    res = await axios.get<{
      name: string;
      ownner_id: string;
      topics: string[];
      description: string;
      joined: boolean;
      createdAt: string;
      adultContent: boolean;
      mods: string[];
      posts: {
        path: string | string[];
        id: number;
        author_id: string;
        author_username: string;
        title: string;
        content: string[];
        createdAt: string;
        updatedAt: string;
        subreddit_id: string;
        votes: number;
        user_vote: number;
      }[];
    }>("http://localhost:5000/api/subreddit/getSubreddit/" + name, {
      withCredentials: true,
      params: { order, time, page },
    });
  } catch (error) {
    res = error;
  }

  return res;
};
