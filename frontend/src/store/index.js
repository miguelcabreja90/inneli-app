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
  modules: ['app', 'auth']
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    settings
  },
  plugins: [vuexLocal.plugin]
})

export default store
