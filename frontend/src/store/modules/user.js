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

const state = {
  users: [],
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
    photo: ''
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
    photo: ''
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
      photo: ''
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
      photo: ''
    }
  },
  [SET_EDIT_USER](state, profile) {
    state.editUser.push(profile)
  },
  [USER_DELETED](state) {
    console.log({ state })
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
      .then(() => {
        commit(USER_UPDATED)
        commit(ENV_DATA_PROCESS, false)
        //dispatch('user/getUsers', null, { root: true })
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
