import axios from "axios";

export const votePost = async (voteValue: number, postId: string) => {
  await axios.post(
    "http://localhost:5000/api/post/vote/",
    {
      voteValue,
      postId,
    },
    { withCredentials: true }
  );
};
