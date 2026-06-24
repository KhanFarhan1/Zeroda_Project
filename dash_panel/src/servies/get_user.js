import axios from "axios";

export async function getUser() {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/get_me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
