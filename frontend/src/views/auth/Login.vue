<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <img src="/static/m.png" alt="Inneli APP" width="55" />
            <h1 class="primary--text display-1">
              INNELI
            </h1>
          </v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              class="my-10"
              lazy-validation
              v-model="formValid"
            >
              <v-text-field
                append-icon="person"
                autocomplete="off"
                name="login"
                :label="$vuetify.lang.t('$vuetify.email')"
                :placeholder="$vuetify.lang.t('$vuetify.email')"
                type="email"
                required
                :rules="formRule.email"
                v-model="fromModel.email"
              />
              <v-text-field
                append-icon="lock"
                autocomplete="off"
                name="password"
                :label="$vuetify.lang.t('$vuetify.password')"
                :placeholder="$vuetify.lang.t('$vuetify.password')"
                type="password"
                :rules="formRule.password"
                required
                v-model="fromModel.password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-tooltip v-for="item in socialIcons" :key="item.text" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mr-3"
                  v-text="item.icon"
                  v-bind="attrs"
                  v-on="on"
                  @click="handleSocialLogin"
                />
              </template>
              <span>{{ item.text }}</span>
            </v-tooltip>
            <v-spacer />
            <v-btn large tile color="primary" @click="login">
              <v-icon>mdi-account</v-icon>
              {{ $vuetify.lang.t('$vuetify.login') }}
            </v-btn>
            <v-btn large tile color="primary" :to="{ name: 'register' }">
              <v-icon>mdi-account-plus</v-icon>
              {{ $vuetify.lang.t('Register') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageLogin',
  data() {
    return {
      formValid: false,
      loading: false,
      formRule: {
        email: [
          (v) =>
            !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['email'])
        ],
        password: [
          (v) =>
            !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['password'])
        ]
      }
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn', 'fromModel', 'socialIcons']),
    ...mapGetters(['errors'])
  },
  methods: {
    ...mapActions('auth', ['sendLoginRequest']),
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true
        setTimeout(() => {
          this.sendLoginRequest(this.fromModel).then(() => {
            this.$router.push('/dashboard')
          })
        }, 1000)
      }
    },
    handleSocialLogin() {}
  }
}
</script>

<style lang="sass" scoped>
.page-login
  &__card
    max-width: 600px
    margin: 0 auto
</style>
