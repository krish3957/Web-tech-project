import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
export const key = process.env.REACT_APP_SECRET_KEY?.toString();

const storage = JSON.parse(localStorage.getItem("persist:root"));
const user = storage && storage.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser && currentUser.accesTocken;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers:{token :`Bearer ${TOKEN}`}
}
);

