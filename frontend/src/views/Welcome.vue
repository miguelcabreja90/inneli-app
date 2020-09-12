<template>
  <div class="page-welcome">
    <v-alert prominent color="orange" style="margin: 20px" icon="mdi-alert">
      <v-row align="center">
        <v-col class="grow">
          {{ $vuetify.lang.t('$vuetify.activeAccount')}}
        </v-col>
      </v-row>
    </v-alert>
    <v-card class="pa-3 page-login__card" tile>
      <v-img src="/static/avatar/avatar-undefined.jpg" height="300">
        <v-layout column class="media ma-0">
          <v-card-title>
            <v-spacer></v-spacer>
            <v-btn dark icon class="mr-3">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-card-title>
          <v-spacer></v-spacer>
        </v-layout>
      </v-img>
      <v-list two-line class="pa-0">
        <v-list-item href="#">
          <v-list-item-action>
            <v-icon color="indigo">mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              v-text="userData.firstName?userData.firstName:$vuetify.lang.t('$vuetify.noDefined')"></v-list-item-title>
            <v-list-item-subtitle v-text="$vuetify.lang.t('$vuetify.firstName')"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item href="#">
          <v-list-item-action>
            <v-icon color="indigo">mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              v-text="userData.email?userData.email:$vuetify.lang.t('$vuetify.noDefined')"></v-list-item-title>
            <v-list-item-subtitle v-text="$vuetify.lang.t('$vuetify.email')"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <profile></profile>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'

  export default {
    name: 'Welcome',
    computed: {
      ...mapState('auth', ['isLoggedIn', 'userData']),
      ...mapGetters(['errors']),
    },
    mounted() {
      this.getUserData()
    },
    created() {
      this.getUserData()
    },
    methods: {
      ...mapActions('auth', ['getUserData'])
    }
  }
</script>

<style lang="sass" scoped>
  .page-login
    &__card
      max-width: 600px
      margin: 0 auto
</style>
