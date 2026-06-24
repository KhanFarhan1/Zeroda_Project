import axios from "axios";
export const getOrderapi = async () => {
  let res = await axios("http://localhost:8080/order");
  return res.data;
};
