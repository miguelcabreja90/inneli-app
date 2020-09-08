<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="showDrawer"></app-drawer>
    <app-toolbar class="app--toolbar" @side-icon-click="handleDrawerShow"></app-toolbar>
    <v-content>
      <!-- Page Header -->
      <page-header></page-header>
      <div class="page-wrapper">
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer">
        <span class="caption">INNELI &copy; {{ new Date().getFullYear() }}</span>
        <v-spacer></v-spacer>
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <app-fab></app-fab>
  </v-app>
</template>

<script>
import AppDrawer from "@/components/core/AppDrawer"
import AppToolbar from "@/components/core/AppToolbar"
import AppFab from "@/components/core/AppFab"
import PageHeader from "@/components/core/PageHeader"

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader
  },

  data() {
    return {
      showDrawer: true
    }
  },
  methods: {
    handleDrawerShow() {
      this.showDrawer = !this.showDrawer
    }
  },
  created() {}
}
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
