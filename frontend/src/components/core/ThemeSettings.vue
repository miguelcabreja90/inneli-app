<template>
  <div class="themeSetting">
    <v-toolbar color="blue">
      <v-toolbar-title>
        {{ this.$t("setting.title") }}
      </v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-layout column>
        <v-flex>
          <v-subheader class="px-1 my-2">
            {{ this.$t("setting.themeColor") }}
          </v-subheader>
          <div class="color-option">
            <v-layout wrap>
              <label
                class="color-option--label flex xs6 pa-1"
                v-for="(option, index) in themeColorOptions"
                :key="index"
              >
                <input type="radio" name="color" :value="option.key" v-model="themeColor" />
                <span class="color-option--item bg">
                  <span class="overlay">
                    <span class="material-icons">check</span>
                  </span>
                  <span class="color-option--item--header sideNav" :class="option.value.sideNav"></span>
                  <span class="color-option--item--header mainNav" :class="option.value.mainNav"></span>
                  <span class="sideMenu" :class="option.value.sideMenu"></span>
                </span>
              </label>
            </v-layout>
          </div>
          <div class="theme-options">
            <v-subheader class="px-1 my-2">
              {{ this.$t("setting.themeLocale") }}
            </v-subheader>
            <v-divider></v-divider>
            <div class="my-3">
              <v-btn-toggle v-model="themeLocale">
                <v-btn flat value="es">
                  {{ this.$t("setting.spanish") }}
                </v-btn>
                <v-btn flat value="en">
                  {{ this.$t("setting.english") }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import colors from "vuetify/es5/util/colors"
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      colors: colors
    }
  },
  computed: {
    ...mapState("settings", ["language", "theme", "mapColor"]),
    themeColorOptions() {
      return this.mapColor
    },
    themeColor: {
      get: function() {
        return this.theme
      },
      set: function(val) {
        this.$emit("emitter-theme", val)
        this.$vuetify.theme.primary = this.colors[val].base
        this.updateTheme(val)
      }
    },
    themeLocale: {
      get: function() {
        return this.language
      },
      set: function(val) {
        this.$emit("emitter-locale", val)
        this.$i18n.locale = val
        this.updateLanguage(val)
      }
    }
  },
  methods: {
    ...mapActions("settings", ["updateLanguage", "updateTheme"])
  }
}
</script>
<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer

    & input[type="radio"]
      display: none

      & + span
        position: relative

        & > .overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .3);
          text-align: center;
          line-height: 30px;
          color: #fff;

      &:checked + span > .overlay
        display: block

    & .bg
      background-color: #f1f1f1

  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0, 0, 0, .1);
    margin-bottom: 15px;

    &--header
      height: 10px

    & > span
      display: block;
      float: left;
      width: 50%;
      height: 20px;
</style>
