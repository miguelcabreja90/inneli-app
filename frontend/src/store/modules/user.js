import user from '@/api/user'

const USER_ENABLED = true

const FETCHING_USERS = 'FETCHING_USERS'
const SWITCH_USER_NEW_MODAL = 'SWITCH_USER_NEW_MODAL'
const SWITCH_USER_EDIT_MODAL = 'SWITCH_USER_EDIT_MODAL'
const USER_CREATED = 'USER_CREATED'
const USER_EDIT = 'USER_EDIT'
const USER_UPDATED = 'USER_UPDATED'
const USER_DELETED = 'USER_DELETED'
const USER_TABLE_LOADING = 'USER_TABLE_LOADING'
const FAILED_USER = 'FAILED_USER'
const ENV_DATA_PROCESS = 'ENV_DATA_PROCESS'
const SET_EDIT_USER = 'SET_EDIT_USER'
const SET_USER_AVATAR = 'SET_USER_AVATAR'

const state = {
  users: [],
  avatar: '',
  loading: false,
  saved: false,
  newUser: {
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    address: '',
    city: '',
    phone: '',
    country: '',
    company: '',
    postalCode: '',
    aboutMe: '',
    avatar: ''
  },
  editUser: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    address: '',
    city: '',
    phone: '',
    country: '',
    company: '',
    postalCode: '',
    aboutMe: '',
    avatar: ''
  },
  isUserTableLoading: false,
  isActionInProgress: false
}

const mutations = {
  [SWITCH_USER_NEW_MODAL](state, showModal) {
    state.showNewModal = showModal
  },
  [SWITCH_USER_EDIT_MODAL](state, showModal) {
    state.showEditModal = showModal
  },
  [USER_TABLE_LOADING](state, isLoading) {
    state.isUserTableLoading = isLoading
  },
  [FETCHING_USERS](state, users) {
    state.users = users
  },
  [ENV_DATA_PROCESS](state, isActionInProgress) {
    state.isActionInProgress = isActionInProgress
  },
  [USER_CREATED](state) {
    state.showNewModal = false
    state.newUser = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      address: '',
      city: '',
      phone: '',
      country: '',
      company: '',
      postalCode: '',
      aboutMe: '',
      avatar: ''
    }
  },
  [USER_EDIT](state, userId) {
    state.editUser = Object.assign(
      {},
      state.users.filter((node) => node.node.id === userId).shift().node
    )
  },
  [USER_UPDATED](state) {
    state.showEditModal = false
    state.editUser = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      address: '',
      city: '',
      phone: '',
      country: '',
      company: '',
      postalCode: '',
      aboutMe: '',
      avatar: ''
    }
    state.saved = true
  },
  [SET_EDIT_USER](state, profile) {
    state.editUser.push(profile)
  },
  [USER_DELETED](state) {
    console.log({ state })
  },
  [SET_USER_AVATAR](state, avatar) {
    state.avatar = avatar
    state.saved = true
  }
}

const getters = {}

const actions = {
  toogleNewModal({ commit }, showModal) {
    commit(SWITCH_USER_NEW_MODAL, showModal)
  },
  toogleEditModal({ commit }, showModal) {
    commit(SWITCH_USER_EDIT_MODAL, showModal)
  },
  openEditModal({ commit }, userId) {
    commit(SWITCH_USER_EDIT_MODAL, true)
    commit(USER_EDIT, userId)
  },
  async getUsers({ commit }) {
    commit(USER_TABLE_LOADING, true)
    // noinspection JSUnresolvedVariable
    await user
      .fetchUsers()
      .then(({ data }) => commit(FETCHING_USERS, data.users.edges))
      .then(() => commit(USER_TABLE_LOADING, false))
      .catch((error) => commit(FAILED_USER, error))
  },
  async createUser({ commit, dispatch }) {
    commit(ENV_DATA_PROCESS, true)

    await user
      .createUser(state.newUser)
      .then(() => commit(USER_CREATED))
      .then(() => commit(ENV_DATA_PROCESS, false))
      .then(() => dispatch('user/getUsers', null, { root: true }))
      .catch((error) => commit(FAILED_USER, error))
  },
  async updateUser({ commit, dispatch }, profile) {
    const request = profile ? profile : state.editUser
    await user
      .sendUpdateRequest(request)
      .then(({ data }) => {
        commit(USER_UPDATED)
        commit(ENV_DATA_PROCESS, false)
        dispatch('auth/getUserData', null, { root: true })
      })
      .catch((error) => commit('SET_ERRORS', error, { root: true }))
  },
  async deleteUser({ commit, dispatch }, userId) {
    await user
      .deleteUser(userId)
      .then(() => commit(USER_DELETED))
      .then(() => dispatch('user/getUsers', null, { root: true }))
      .catch((error) => commit(FAILED_USER, error))
  },

  async updateAvatar({ commit, dispatch }, file) {
    const image = `data:${file.file.type};base64,${file.file.base64}`
    const sendData = {
      id: file.id,
      image: image
    }
    await user.updateAvatar(sendData).then((response) => {
      commit(SET_USER_AVATAR, file.file.base64)
      dispatch('auth/getUserData', null, { root: true })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
