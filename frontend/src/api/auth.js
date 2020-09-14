import api from '@/config/api'
/** Auth API */
const getUserData = () => {
  return api.get('user')
}

const loginRequest = ({ email, password }) => {
  const user = { email, password }
  return api.post('login', user)
}

const registerRequest = (user) => {
  return api.post('register/', user)
}

const logoutRequest = () => {
  return api.post('logout')
}

const verifyResendRequest = () => {
  return api.get('email/resend')
}

const verifyRequest = (hash) => {
  return api.get(`email/verify/${hash}`)
}

const verifyMailForgot = (email) => {
  return api.post('password/reset', { email: email })
}

export default {
  getUserData,
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyRequest,
  verifyResendRequest,
  verifyMailForgot
}
