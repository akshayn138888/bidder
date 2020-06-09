import { baseUrl } from "./config";

export const Session = {
  create(params) {
    return fetch(`${baseUrl}/session`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  destroy() {
    return fetch(`${baseUrl}/session`, {
      method: "DELETE"
    }).then(res => res.json());
  }
};
export const User = {
  current() {
    return fetch(`${baseUrl}/users/current`, {
      method: "GET",
      credentials: "include"
    }).then(res => res.json());
  }
};

export default {
  Session,
  User
};
