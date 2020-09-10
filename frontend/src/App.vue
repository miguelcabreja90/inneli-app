<template>
  <v-app :dark="true">
    <router-view></router-view>
    <!-- theme setting -->
    <v-btn
      small
      fab
      dark
      fixed
      top="top"
      right="right"
      class="setting-fab"
      color="red"
      @click="openThemeSettings"
    >
      <v-icon>settings</v-icon>
    </v-btn>
    <!-- setting drawer -->
    <v-navigation-drawer
      class="setting-drawer"
      temporary
      right
      v-model="rightDrawer"
      hide-overlay
      fixed
    >
      <theme-settings></theme-settings>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import ThemeSettings from '@/components/ThemeSettings'
import { mapGetters } from 'vuex'
export default {
  components: {
    ThemeSettings
  },
  data() {
    return {
      rightDrawer: false
    }
  },
  computed: {
    ...mapGetters(['errors'])
  },
  created() {
    // add app events
  },
  methods: {
    openThemeSettings() {
      this.$vuetify.goTo(0)
      this.rightDrawer = !this.rightDrawer
    }
  }
}
</script>

<style lang="sass" scoped>
.setting-fab
  top: 50% !important
  right: 0
  border-radius: 0
</style>
