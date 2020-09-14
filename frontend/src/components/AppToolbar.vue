<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon v-if="showNavIcon" @click="handleDrawerToggle" />
    <v-spacer />
    <v-toolbar-items>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu
        v-if="showMenuLang"
        offset-y
        origin="center center"
        class="elelvation-1"
        transition="scale-transition"
      >
      </v-menu>
      <v-select
        v-model="$vuetify.lang.current"
        :items="availableLanguages"
        class="mt-3"
        item-text="text"
        item-value="value"
        menu-props="auto"
        prepend-icon="mdi-translate"
        style="width:8em"
        @change="handleChangeLocale($event)"
      ></v-select>
      <v-menu
        v-if="showMenuUser"
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon large text slot="activator" v-on="on">
            <v-avatar size="30px">
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in profileMenus"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            @click="item.click"
            ripple="ripple"
            :disabled="item.disabled"
            :target="item.target"
            rel="noopener"
            :key="index"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
    <v-toolbar tag="div" dense slot="extension" color="white" light>
      <v-icon>mdi-home</v-icon>
      <v-breadcrumbs :items="breadcrumbs" class="pa-3" />
    </v-toolbar>
  </v-app-bar>
</template>
<script>
import Util from '@/util'
import { mapActions, mapGetters } from 'vuex'
import localStorage from '@/config/localStorage'

export default {
  name: 'AppToolbar',
  props: {
    showNavIcon: {
      type: Boolean,
      default: true
    },
    showMenuLang: {
      type: Boolean,
      default: true
    },
    showMenuUser: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    toolbarColor() {
      return this.$vuetify.options.extra.mainNav
    },
    availableLanguages() {
      const { locales } = this.$vuetify.lang
      return Object.keys(locales).map((lang) => {
        return {
          text: locales[lang].label,
          value: lang
        }
      })
    },
    localeText() {
      const find = this.availableLanguages.find(
        (item) => item.value === this.$vuetify.lang.current
      )
      return find.text
    },
    breadcrumbs() {
      const { matched } = this.$route
      return matched.map((route, index) => {
        const to =
          index === matched.length - 1
            ? this.$route.path
            : route.path || route.redirect
        const text = this.$vuetify.lang.t('$vuetify.menu.' + route.meta.title)
        return {
          text: text,
          to: to,
          exact: true,
          disabled: false
        }
      })
    },
    profileMenus() {
      return [
        {
          icon: 'account_circle',
          href: '#',
          title: this.$vuetify.lang.t('$vuetify.menu.profile'),
          click: this.handleProfile
        },
        {
          icon: 'settings',
          href: '#',
          title: this.$vuetify.lang.t('$vuetify.menu.settings'),
          click: this.handleSetting
        },
        {
          icon: 'mdi-logout',
          href: '#',
          title: this.$vuetify.lang.t('$vuetify.menu.logout'),
          click: this.handleLogout
        }
      ]
    }
  },
  methods: {
    ...mapActions('auth', ['sendLogoutRequest', 'getUserData']),
    handleDrawerToggle() {
      this.$emit('side-icon-click')
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
    handleLogout() {
      this.sendLogoutRequest().then(() => {
        this.$router.push('/auth/login')
      })
    },
    handleChangeLocale(value) {
      this.$vuetify.lang.current = value
      localStorage.setLanguage(value)
    },
    handleSetting() {},
    handleProfile() {
      this.$router.push({ name: 'Profile' })
    }
  },
  created() {
    this.getUserData()
  }
}
</script>

<style lang="sass" scoped></style>
