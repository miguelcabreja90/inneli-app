import axios from "axios";
import { getToken } from "@/data/localStorage";

const baseUrl = process.env.VUE_APP_API_URL || "http://localhost:8000/api/";

const post = (url, config) => {
  return axios.post(url, config, {
    headers: {
      Authorization: getToken()
    }
  });
};
const get = url => {
  return axios.get(url, {
    headers: {
      Authorization: getToken()
    }
  });
};
/*const remove = (url, config) => {
  return axios.delete(url, config, {
    headers: {
      Authorization: getToken()
    }
  });
}*/
const put = (url, config) => {
  return axios.put(url, config, {
    headers: {
      Authorization: getToken()
    }
  });
};

/** Auth API */
const getUserData = () => {
  return get(baseUrl + "/user");
};

const loginRequest = ({ email, password }) => {
  const user = { email, password };
  return post(baseUrl + "login", user);
};

const registerRequest = ({ user }) => {
  return put(baseUrl + "register/", user);
};
const logoutRequest = () => {
  return post(baseUrl + "logout");
};
const verifyResendRequest = () => {
  return get(baseUrl + "email/resend");
};

const verifyRequest = ({ hash }) => {
  return get(baseUrl + "email/verify/", hash);
};

// Register the methods
export default {
  getUserData: getUserData,
  loginRequest: loginRequest,
  registerRequest: registerRequest,
  logoutRequest: logoutRequest,
  verifyRequest: verifyRequest,
  verifyResendRequest: verifyResendRequest
};
