import axios from "axios"
import { getToken } from "./localStorage"

const post = (url, config) =>
  axios.post(url, config, {
    headers: {
      Authorization: getToken()
    }
  })
const get = url => {
  return axios.get(url, {
    headers: {
      Authorization: getToken()
    }
  })
}
const remove = (url, config) => {
  return axios.delete(url, config, {
    headers: {
      Authorization: getToken()
    }
  })
}
const put = (url, config) => {
  return axios.put(url, config, {
    headers: {
      Authorization: getToken()
    }
  })
}

export default {
  get: get,
  post: post,
  put: put,
  remove: remove
}
