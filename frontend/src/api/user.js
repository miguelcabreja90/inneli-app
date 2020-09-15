import api from '@/config/api'

export default {
  fetchUsers() {
    return api.get('users')
  },
  sendUpdateRequest(user) {
    return user.id ? api.put('users/' + user.id, user) : api.post('users', user)
  },
  sendDeleteRequest(userId) {
    return api.remove('users/' + userId)
  },
  updateAvatar(avatar) {
    return api.post('users/avatar/' + avatar.id, avatar)
  }
}
