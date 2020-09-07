import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from './plugins/vuetify' // path to vuetify export
import { setupComponents } from './config/setup-components'
import { i18n } from './lang'

Vue.config.productionTip = false;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 422) {
      store.commit("setErrors", error.response.data.errors);
    } else if (error.response.status === 401) {
      store.commit("auth/setUserData", null);
      localStorage.removeItem("authToken");
      router.push({ name: "Login" }).then(() => {
      });
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.use(function(config) {
  config.headers.common = {
    Authorization: `Bearer ${ localStorage.getItem("authToken") }`,
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  return config;
});

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their 'basename'.
 *
 * Eg. ./components/index.vue -> <example-component></example-component>
 */
setupComponents(Vue)

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
