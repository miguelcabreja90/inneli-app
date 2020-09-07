import { getToken, removeToken, saveToken } from "@/data/localStorage";
import api from "@/data/api";

const SET_USER_DATA = "SET_USER_DATA";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";
const LOGOUT = "LOGOUT";
const LOGIN = "LOGIN";

const state = {
  isLoggedIn: !!getToken(),
  userData: null,
  pending: false
};

// getters
const getters = {
  user: state => state.userData,
  isLoggedIn: state => state.isLoggedIn
};

// actions
const actions = {
  async getUserData({ commit }) {

    await api.getUserData()
      .then(({ data }) => commit(SET_USER_DATA, data))
      .catch(() => removeToken());

  },
  async sendLoginRequest({ commit }, login) {
    commit("setErrors", {}, { root: true });
    commit(LOGIN)

    return await api.loginRequest(login)
      .then(({ data }) => {
        commit(SET_USER_DATA, data.user);
        commit(LOGIN_SUCCESS);
        saveToken(data.token);
      });
  },
  async sendRegisterRequest({ commit }, register) {
    commit("setErrors", {}, { root: true });

    return await api.registerRequest(register)
      .then(({ data }) => commit(SET_USER_DATA, data.user))
      .then(({ data }) => saveToken(data.token));
  },
  async sendLogoutRequest({ commit }) {
    commit(LOGOUT)

    await api.logoutRequest()
      .then(() => commit(SET_USER_DATA, null))
      .then(removeToken());
  },
  async sendVerifyResendRequest() {

    return await api.verifyResendRequest();
  },
  async sendVerifyRequest({ dispatch }, hash) {

    return await api.verifyRequest(hash)
      .then(() => dispatch("getUserData"));
  }
};

// mutations
const mutations = {
  [SET_USER_DATA](state, user) {
    state.userData = user;
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
  }
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
