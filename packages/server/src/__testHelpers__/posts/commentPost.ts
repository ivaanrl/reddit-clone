import axios from "axios";
import faker from "faker";

export const commentPost = async (postId: string) => {
  const comment = [
    faker.lorem.words(3),
    faker.lorem.words(3),
    faker.lorem.words(3),
  ];
  await axios.post(
    "http://localhost:5000/api/post/comment/",
    {
      content: comment,
      postId,
    },
    { withCredentials: true }
  );
};
