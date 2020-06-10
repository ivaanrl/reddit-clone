import axios from "axios";

export const loginUser = async (
  username: string,
  password: string,
  email: string
) => {
  await axios.post("http://localhost:5000/api/auth/signup", {
    username,
    password,
    email,
  });
};
