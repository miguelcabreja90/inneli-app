<template>
  <v-app-bar color="primary" dark app>
    <v-app-bar-nav-icon @click="handleDrawerToggle" />
    <v-spacer />
    <v-toolbar-items>
      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu
        offset-y
        origin="center center"
        class="elelvation-1"
        transition="scale-transition"
      >
      </v-menu>
      <v-menu
        offset-y
        origin="center center"
        class="elelvation-1"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn text slot="activator" v-on="on">
            <v-icon medium>mdi-translate</v-icon>
            <span class="ml-2"> {{ localeText }} </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="$vuetify.lang.current">
            <v-list-item
              @click="handleChangeLocale(item)"
              v-for="item in availableLanguages"
              :key="item.value"
              :value="item.value"
            >
              <v-list-item-title v-text="item.text" />
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu offset-y origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on }">
          <v-btn icon large text slot="activator" v-on="on">
            <v-avatar size="30px">
              <img src="/static/avatar/man_4.jpg" alt="Michael Wang" />
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
      <v-spacer></v-spacer>
      <v-btn icon small color="black">
        <v-icon v-text="'mdi-arrow-left'" @click="handleGoBack" />
      </v-btn>
    </v-toolbar>
  </v-app-bar>
</template>
<script>
import Util from '@/util'
export default {
  name: 'AppToolbar',
  data() {
    return {
      profileMenus: [
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: this.handleProfile
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: this.handleSetting
        },
        {
          icon: 'fullscreen_exit',
          href: '#',
          title: 'Logout',
          click: this.handleLogut
        }
      ]
    }
  },
  computed: {
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
    }
  },
  methods: {
    handleDrawerToggle() {
      this.$emit('side-icon-click')
    },
    handleFullScreen() {
      Util.toggleFullScreen()
    },
    handleLogut() {
      this.$router.push('/auth/login')
    },
    handleChangeLocale({ value }) {
      this.$vuetify.lang.current = value
    },
    handleSetting() {},
    handleProfile() {},
    handleGoBack() {
      this.$router.go(-1)
    }
  },
  created() {}
}
</script>

<style lang="sass" scoped></style>