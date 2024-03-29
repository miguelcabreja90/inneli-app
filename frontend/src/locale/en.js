import en from 'vuetify/es5/locale/en'

export default {
  label: 'English',
  //page login
  login: 'login',
  forgot: 'Forgot Password?',
  reset_password: 'Reset Password',
  forgot_btn: 'Send Reset Link',
  username: 'Username',
  name: 'Name',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  password: 'Password',
  confirm: 'Confirm',
  register: 'Register',
  noDefined: 'No defined',
  aboutMe: 'About me',
  activeAccount:
    'Hello, your account has been created, but it has not been activated yet. Please access the registered email, you have been sent a message for activation.',
  confirm_password: 'Confirm Password',
  company: 'Company',
  first_name: 'First Name',
  last_name: 'Last Name',
  address: 'Address',
  city: 'City',
  country: 'Country',
  postal_code: 'Postal Code',
  about_me: 'About Me',
  phone: 'Phone',
  wait: 'Please a wait...',
  // menu
  menu: {
    home: 'Home',
    dashboard: 'Dashboard',
    access_denied: 'Access Deny',
    verify: 'Email Verify',
    welcome: 'Welcome',
    user_profile: 'User Profile',
    profile: 'Profile',
    settings: 'Setting',
    logout: 'Logout'
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
    length: 'This field need {0} characters',
    match: '{0} and {1} do not match',
    bad_email: '{0}  must be valid',
    required_element: 'This element is required'
  },
  //error
  messages: {
    refused: 'Failed: Connections refused.',
    success_avatar: 'The image was successfully saved.',
    success_profile: 'The data has been updated.',
    check_mail: 'An email has been sent with the details to change password.',
    password_success: 'The password was updated successfully.'
  },
  //user
  user: {
    edit_profile: 'Edit Profile',
    sub_profile: 'Complete your profile',
    btn_edit: 'Update'
  },

  ...en
}
