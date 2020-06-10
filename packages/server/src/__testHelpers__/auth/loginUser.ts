import axios from "axios";

export const loginUser = async (
  username: string,
  password: string,
  email: string
) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/signup",
    {
      username,
      password,
      email,
    },
    { withCredentials: true }
  );
  return res;
};
