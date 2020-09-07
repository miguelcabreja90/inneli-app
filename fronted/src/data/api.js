import axios from 'axios'
import { getToken } from '@/data/localStorage'

const baseUrl = process.env.VUE_APP_API_URL | 'http://localhost:8000/api/'

const login = (email, password) => {

}

const post = (url, config) => {
  return axios.post(url, config, {
    headers: {
      Authorization: getToken()
    }
  })
}
const get = (url) => {
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

/** User API */
const fetchUsers = () => {
  return get(baseUrl + '/users')
}

const createUser = (user) => {
  return post(baseUrl + '/users', user)
}

const updateUser = (user) => {
  return put(baseUrl + '/users/' + user.id, user)
}

const deleteUser = (userId) => {
  return remove(baseUrl + '/users/' + userId)
}

// Register the methods
export default {
  login: login,
  fetchUsers: fetchUsers,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
