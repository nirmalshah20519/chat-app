import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";

// require("dotenv").config();

export const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const token = () => localStorage.getItem("token");

export const decodeToken = () => {
  const currToken = token(); // Assuming `token()` retrieves the current JWT
  if (!currToken) {
    alert("Session expired! Redirecting to the login page.");
    deleteToken(); // Assuming `deleteToken()` removes the JWT from storage
    window.location.href = "/"; // Redirect to homepage or login page
    return null;
  }
  const currUser = jwt_decode(currToken);
  if (currUser && currUser.exp * 1000 < Date.now()) {
    alert("Session expired! Redirecting to the login page.");
    deleteToken(); // Assuming `deleteToken()` removes the JWT from storage
    window.location.href = "/"; // Redirect to homepage or login page
    return null;
  }
  if (!currUser) {
    alert("Session expired! Redirecting to the login page.");
    deleteToken(); // Assuming `deleteToken()` removes the JWT from storage
    window.location.href = "/"; // Redirect to homepage or login page
    return null;
  }
  return currUser;
};

export const registerService = async (userDto) => {
  return axios
    .post(baseUrl + `/api/users/register`, userDto)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred", error);
      throw error;
    });
};

export const verifyAccountService = async (verifyDto) => {
  return axios
    .post(baseUrl + `/api/users/verify`, verifyDto)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred", error);
      throw error;
    });
};

export const loginService = async (loginDto) => {
  return axios
    .post(baseUrl + `/api/users/login`, loginDto)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred", error);
      throw error;
    });
};

export const authService = async (authDto) => {
  return axios
    .post(baseUrl + `/api/users/authenticate`, authDto)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred", error);
      throw error;
    });
};

export const getUserByEmail = async (email) => {
  const t = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${t}`,
    },
  };
  return axios
    .get(baseUrl + `/api/users/getByEmail/${email}`, config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error occurred", error);
      throw error;
    });
};
