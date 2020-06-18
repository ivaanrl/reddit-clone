import axios from "axios";

export const getUpvotes = async () => {
  return await axios.get("http://localhost:5000/api/user/getUpvotes", {
    withCredentials: true,
  });
};
