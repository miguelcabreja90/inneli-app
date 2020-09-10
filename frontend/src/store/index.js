import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import app from './modules/app'
import auth from './modules/auth'
import settings from './modules/settings'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex, VueAxios, axios)

const vuexLocal = new VuexPersistence({
  key: 'vma',
  storage: window.localStorage,
  modules: ['app']
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    errors: []
  },
  modules: {
    app,
    auth,
    settings
  },
  plugins: [vuexLocal.plugin],
  getters: {
    errors: (state) => state.errors
  },
  mutations: {
    SET_ERRORS(state, errors) {
      state.errors = errors
    },
    CLEAR_ERRORS(state) {
      state.errors = []
    }
  }
})

export default store
