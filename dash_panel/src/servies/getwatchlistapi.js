import axios from "axios";

export const getwatchlistdata = async () => {
  let res = await axios.get("http://localhost:8080/watchlistdata");
  return res.data;
};
