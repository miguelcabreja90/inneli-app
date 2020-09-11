import en from 'vuetify/es5/locale/en'

export default {
  label: 'English',
  //page login
  login: 'login',
  username: 'Username',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  confirm: 'Confirm',
  register: 'Register',
  confirm_password: 'Confirm Password',
  // menu
  menu: {
    home: 'Home',
    dashboard: 'Dashboard',
    access_denied: 'Access Deny',
    verify: 'Email Verify',
    welcome: 'Welcome'
  },
  //settings
  settings: {
    title: 'Theme Settings',
    color: 'Color Options',
    lang: 'Language',
    sidebar: 'Sidebar Option'
  },
  rule: {
    required: '{0} is required',
    min: 'Just a minimum of {0} characters is allowed',
    max: 'Just a maximum of {0} characters is allowed',
    match: '{0} and {1} do not match',
    bad_email: '{0}  must be valid'
  },
  messages: {
    refused: 'Failed: Connections refused.'
  },

  //error

  ...en
}
