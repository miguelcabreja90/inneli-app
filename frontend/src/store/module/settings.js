import { getLanguage, setLanguage } from "@/config/localStorage"

const SET_LANGUAGE = "SET_LANGUAGE"

const state = {
  language: getLanguage()
}

const actions = {
  async updateLanguage({ commit }, languages) {
    if (typeof languages === "string") {
      await commit(SET_LANGUAGE, languages)
    }
  }
}

const mutations = {
  [SET_LANGUAGE](state, lang) {
    setLanguage(lang)
    state.language = lang
  }
}
const getters = {
  // Shared getters
  language: state => {
    return state.language
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
