import auth from '@/api/auth'
import localStorage from '@/config/localStorage'

const SET_USER_DATA = 'SET_USER_DATA'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILED = 'LOGIN_FAILED'
const LOGOUT = 'LOGOUT'
const LOGIN = 'LOGIN'

const state = {
  isLoggedIn: !!localStorage.getToken(),
  userData: null,
  fromModel: {
    email: '',
    password: ''
  },
  socialIcons: [
    {
      text: 'Google',
      icon: 'mdi-google'
    },
    {
      text: 'Facebook',
      icon: 'mdi-facebook'
    },
    {
      text: 'Twitter',
      icon: 'mdi-twitter'
    }
  ]
}

// getters
const getters = {
  user: (state) => state.userData,
  isLoggedIn: (state) => state.isLoggedIn
}

// actions
const actions = {
  getUserData({ commit }) {
    commit('CLEAR_ERRORS', null, { root: true })

    auth
      .getUserData()
      .then(({ data }) => commit(SET_USER_DATA, data))
      .catch(({ response }) => {
        commit('SET_ERRORS', response, { root: true })
        localStorage.removeToken()
      })
  },
  sendLoginRequest({ commit }, login) {
    commit('CLEAR_ERRORS', null, { root: true })
    commit(LOGIN)

    return auth
      .loginRequest(login)
      .then(({ data }) => {
        commit(SET_USER_DATA, data.user)
        commit(LOGIN_SUCCESS)
        localStorage.saveToken(data.token)
      })
      .catch(({ response }) => {
        commit('SET_ERRORS', response, { root: true })
      })
  },
  sendRegisterRequest({ commit }, register) {
    commit('CLEAR_ERRORS', null, { root: true })
    return auth
      .registerRequest(register)
      .then(({ data }) => commit(SET_USER_DATA, data.user))
      .then(({ data }) => localStorage.saveToken(data.token))
      .catch(({ response }) => {
        commit('SET_ERRORS', response, { root: true })
      })
  },
  sendLogoutRequest({ commit }) {
    commit(LOGOUT)

    auth
      .logoutRequest()
      .then(() => commit(SET_USER_DATA, null))
      .then(localStorage.removeToken())
  },
  sendVerifyResendRequest({ commit }) {
    return auth.verifyResendRequest().catch(({ response }) => {
      commit('SET_ERRORS', response, { root: true })
    })
  },
  sendVerifyRequest({ dispatch }, hash) {
    return auth.verifyRequest(hash).then(() => dispatch('getUserData'))
  }
}

// mutations
const mutations = {
  [SET_USER_DATA](state, user) {
    state.userData = user
  },
  [LOGIN](state) {
    state.pending = true
  },
  [LOGIN_SUCCESS](state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [LOGOUT](state) {
    state.isLoggedIn = false
  },
  [LOGIN_FAILED](state, error) {
    console.log({ state, error })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
