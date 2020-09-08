<template>
  <div id="app">
    <header>
        <page-navbar></page-navbar>
    </header>
    <main class="container" role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
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
