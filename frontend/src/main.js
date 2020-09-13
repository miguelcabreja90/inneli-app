import Vue from 'vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import './plugins/vuetify'
import './theme/default.sass'
import Notifications from './plugins/notifications'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.prototype.$Toast = Notifications.Toast
Vue.prototype.$Swal = Notifications.Swal

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
