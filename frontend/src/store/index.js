import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import auth from "./modules/auth";

Vue.use(Vuex, VueAxios, axios);

export default new Vuex.Store({
  namespaced: true,
  state: {
    errors: [],
    windowHeight: 0,
    windowWidth: 0
  },

  modules: {
    auth
  },

  getters: {
    errors: state => state.errors,
    windowHeight: state => state.windowHeight,
    windowWidth: state => state.windowWidth
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    setWindowHeight(state, { windowHeight }) {
      state.windowHeight = windowHeight;
    },
    setWindowWidth(state, { windowWidth }) {
      state.windowWidth = windowWidth;
    }
  },

  actions: {}
});
