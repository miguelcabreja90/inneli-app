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
                autocomplete="off"
                :type="hidePassword ? 'password' : 'text'"
                :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                name="password"
                :label="$vuetify.lang.t('$vuetify.password')"
                :placeholder="$vuetify.lang.t('$vuetify.password')"
                :rules="formRule.password"
                required
                v-model="fromModel.password"
                @click:append="hidePassword = !hidePassword"
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
            <v-btn
              color="primary"
              @click="login"
              :loading="loading"
              :disabled="!formValid"
            >
              <v-icon>mdi-account</v-icon>
              {{ $vuetify.lang.t('$vuetify.login') }}
            </v-btn>
            <v-btn color="secondary" :to="{ name: 'register' }">
              <v-icon>mdi-account-plus</v-icon>
              {{ $vuetify.lang.t('$vuetify.register') }}
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
      hidePassword: true,
      formRule: {
        email: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.email')
            ]),
          (v) =>
            /.+@.+/.test(v) ||
            this.$vuetify.lang.t('$vuetify.rule.bad_email', [
              this.$vuetify.lang.t('$vuetify.email')
            ])
        ],
        password: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.password')
            ]),
          (v) =>
            (v || '').length >= 8 ||
            this.$vuetify.lang.t('$vuetify.rule.min', ['8'])
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
        this.sendLoginRequest(this.fromModel).then(() => {
          if (this.isLoggedIn) {
            this.loading = false
            this.$router.push('/dashboard')
          } else {
            this.loading = false
          }
        })
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
