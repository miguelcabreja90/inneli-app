import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import app from './modules/app'
import auth from './modules/auth'
import user from './modules/user'
import statics from './modules/statics'
import settings from './modules/settings'
import VuexPersistence from 'vuex-persist'
import router from '@/router'

Vue.use(Vuex, VueAxios, axios)

const vuexLocal = new VuexPersistence({
  key: 'inneli',
  storage: window.localStorage,
  modules: ['app']
})

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    errors: {}
  },
  modules: {
    app,
    auth,
    settings,
    user,
    statics
  },
  plugins: [vuexLocal.plugin],
  getters: {
    errors: (state) => state.errors
  },
  mutations: {
    SET_ERRORS(state, response) {
      if (response) {
        state.errors = {
          status: response.status,
          message: response.data.message
        }
        this._vm.$Toast.fire({
          icon: 'error',
          title: state.errors.message
        })
        if (response.data.message === 'Unauthenticated') {
          router.push({ name: 'Forbidden' })
        }
      } else {
        state.errors = {
          status: 'failed',
          message: 'Failed: Connections refused.'
        }
        this._vm.$Toast.fire({
          icon: 'error',
          title: state.errors.message
        })
      }
    },
    CLEAR_ERRORS(state) {
      state.errors = []
    }
  }
})

export default store
