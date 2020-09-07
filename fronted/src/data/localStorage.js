import Vue from 'vue'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

export function saveToken (authToken) {
  return Vue.localStorage.set('authToken', 'Bearer ' + authToken)
}

export function removeToken () {
  return Vue.localStorage.remove('authToken')
}

export function getToken () {
  return Vue.localStorage.get('authToken')
}

export function setLanguage (item) {
  return Vue.localStorage.set('language', item)
}

export function getLanguage (item) {
  return Vue.localStorage.get('language')
}

export function setTheme (item) {
  return Vue.localStorage.set('theme', item)
}

export function getTheme (item) {
  return Vue.localStorage.get('theme')
}
