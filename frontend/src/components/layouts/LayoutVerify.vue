<template>
  <v-app id="inspire" class="app dashboard">
    <app-drawer class="app--drawer" :show-drawer="false" />
    <app-toolbar class="app--toolbar" :show-nav-icon="false" />
    <v-main>
      <!-- Page Header -->
      <div class="page-wrapper">
        <v-slide-x-transition>
          <router-view />
        </v-slide-x-transition>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="pa-3 app--footer">
        <span>INNELI &copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-main>
    <!-- Go to top -->
    <app-fab />
  </v-app>
</template>

<script>
import AppFab from '@/components/AppFab'
import AppDrawer from '@/components/AppDrawer'
import AppToolbar from '@/components/AppToolbar'

export default {
  name: 'LayoutVerify',
  components: { AppToolbar, AppDrawer, AppFab }
}
</script>

<style scoped></style>
