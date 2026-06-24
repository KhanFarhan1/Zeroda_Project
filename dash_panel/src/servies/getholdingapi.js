import axios from "axios";
export const getholding = async () => {
  let res = await axios("http://localhost:8080/holdings");
  return res.data;
};
