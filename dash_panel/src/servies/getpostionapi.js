import axios from "axios";

export const getpostionapi = async () => {
  let res = await axios.get("http://localhost:8080/postion");
  return res.data;
};
