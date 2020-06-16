import axios from "axios";
import faker from "faker";

export const createPost = async (subName: string) => {
  const title = faker.lorem.words(3);
  const content = [
    faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
    faker.lorem.words(parseInt(faker.random.alphaNumeric(10), 10)),
  ];
  const res = await axios.post(
    "http://localhost:5000/api/post/createPost",
    {
      subName,
      title,
      content,
    },
    { withCredentials: true }
  );
};
