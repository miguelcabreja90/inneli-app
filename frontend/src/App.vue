<template>
  <div id="app">
    <header>
      <nav-bar></nav-bar>
    </header>
    <main class="container" role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from "./components/core/nav-bar";

export default {
  components: {NavBar},
  computed: {
    ...mapGetters("auth", ["user"])
  },

  mounted() {
    if (localStorage.getItem("authToken")) {
      this.getUserData();
    }
  },

  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout() {
      this.sendLogoutRequest();
      this.$router.push("/");
    }
  }
};
</script>

<style>
body > div > .container {
  padding: 60px 15px 0;
}
</style>
