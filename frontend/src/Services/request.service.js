import axios from "axios";
import { baseUrl } from "./auth.service";

export const getMyRequests = async (email) => {
    const t = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${t}`,
      },
    };
    return axios
      .get(baseUrl + `/api/requests/getMyRequests/${email}`, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error occurred", error);
        throw error;
      });
  };