import axios from "axios";

export const logoutUser = async () => {
  return await axios.get("http://localhost:5000/api/auth/signout", {
    withCredentials: true,
  });
};
