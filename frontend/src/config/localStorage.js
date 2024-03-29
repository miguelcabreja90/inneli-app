import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

const saveToken = (authToken) => {
  return Vue.localStorage.set('authToken', 'Bearer ' + authToken)
}

const removeToken = () => {
  return Vue.localStorage.remove('authToken')
}

const getToken = () => {
  return Vue.localStorage.get('authToken')
}

const setLanguage = (item) => {
  return Vue.localStorage.set('language', item)
}
const getLanguage = () => {
  return Vue.localStorage.get('language')
}

const setTheme = (item) => {
  return Vue.localStorage.set('theme', item)
}
const getTheme = () => {
  return Vue.localStorage.get('theme')
}

export default {
  getToken,
  saveToken,
  setLanguage,
  getLanguage,
  setTheme,
  getTheme,
  removeToken
}
