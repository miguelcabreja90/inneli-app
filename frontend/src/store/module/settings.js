import { getLanguage, setLanguage, getTheme, setTheme } from "@/config/localStorage"

const SET_LANGUAGE = "SET_LANGUAGE"
const SET_THEME = "SET_THEME"

const state = {
  language: getLanguage(),
  theme: getTheme(),
  mapColor: [
    {
      key: "blue",
      value: {
        sideNav: "blue",
        mainNav: "blue",
        sideMenu: "white"
      }
    },
    {
      key: "teal",
      value: {
        sideNav: "teal",
        mainNav: "teal",
        sideMenu: "white"
      }
    },
    {
      key: "red",
      value: {
        sideNav: "red",
        mainNav: "red",
        sideMenu: "white"
      }
    },
    {
      key: "orange",
      value: {
        sideNav: "orange",
        mainNav: "orange",
        sideMenu: "white"
      }
    },
    {
      key: "indigo",
      value: {
        sideNav: "indigo",
        mainNav: "indigo",
        sideMenu: "white"
      }
    },
    {
      key: "cyan",
      value: {
        sideNav: "cyan",
        mainNav: "cyan",
        sideMenu: "white"
      }
    }
  ]
}

const actions = {
  async updateLanguage({ commit }, language) {
    if (typeof language === "string") {
      await commit(SET_LANGUAGE, language)
    }
  },
  async updateTheme({ commit }, theme) {
    await commit(SET_THEME, theme)
  }
}

const mutations = {
  [SET_LANGUAGE](state, lang) {
    setLanguage(lang)
    state.language = lang
  },
  [SET_THEME](state, theme) {
    setTheme(theme)
    state.theme = theme
  }
}
const getters = {
  // Shared getters
  language: state => {
    return state.language
  },
  theme: state => {
    return state.theme
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
