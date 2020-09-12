import api from '@/config/api'

export default {
  fetchUsers() {
    return api.get('users')
  },
  sendUpdateRequest(user) {
    return api.put('users/' + user.id, user)
  }
}
