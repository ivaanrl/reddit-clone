import axios from "axios";

export const createSubreddit = async (
  name: string,
  communityTopics: string[],
  description: string,
  adultContent: boolean
) => {
  const res = await axios.post(
    "http://localhost:5000/api/subreddit/createSubreddit",
    {
      name,
      communityTopics,
      description,
      adultContent,
    },
    { withCredentials: true }
  );
};
