import axios from "axios";

export const getDownvotes = async () => {
  return await axios.get("http://localhost:5000/api/user/getDownvotes", {
    withCredentials: true,
  });
};
