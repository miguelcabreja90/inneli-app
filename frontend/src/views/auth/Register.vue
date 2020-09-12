<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <h1 class="primary--text display-1 text-center">
              {{ $vuetify.lang.t('$vuetify.register') }}
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
                name="register"
                :label="$vuetify.lang.t('$vuetify.first_name')"
                :placeholder="$vuetify.lang.t('$vuetify.first_name')"
                type="text"
                required
                :rules="formRule.firstName"
                v-model="formRegister.firstName"
              />
              <v-text-field
                append-icon="email"
                autocomplete="off"
                name="register"
                :label="$vuetify.lang.t('$vuetify.email')"
                :placeholder="$vuetify.lang.t('$vuetify.email')"
                type="email"
                required
                :rules="formRule.email"
                v-model="formRegister.email"
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
                v-model="formRegister.password"
              />
              <v-text-field
                append-icon="lock"
                autocomplete="off"
                name="password_confirmation"
                :label="$vuetify.lang.t('$vuetify.confirm_password')"
                :placeholder="$vuetify.lang.t('$vuetify.confirm_password')"
                type="password"
                :rules="formRule.password_confirmation"
                required
                v-model="formRegister.password_confirmation"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn large tile color="secondary" :to="{ name: 'login' }">
              <v-icon>mdi-account</v-icon>
              {{ $vuetify.lang.t('$vuetify.login') }}
            </v-btn>
            <v-spacer />
            <v-btn
              large
              tile
              color="primary"
              @click="registerUser"
              :loading="loading"
              :disabled="!formValid"
            >
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
  name: 'Register',
  data() {
    return {
      loading: false,
      formValid: false,
      formRule: {
        firstName: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.name')
            ])
        ],
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
        ],
        password_confirmation: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.confirm_password')
            ]),
          (v) =>
            (!!v && v) === this.formRegister.password ||
            this.$vuetify.lang.t(
              '$vuetify.rule.match',
              [this.$vuetify.lang.t('$vuetify.password')],
              [this.$vuetify.lang.t('$vuetify.confirm_password')]
            )
        ]
      }
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn', 'formRegister']),
    ...mapGetters(['errors']),
    prefix() {
      return ''
    }
  },
  methods: {
    ...mapActions('auth', ['sendRegisterRequest']),
    registerUser() {
      if (this.$refs.form.validate()) {
        this.loading = true
        setTimeout(() => {
          this.sendRegisterRequest(this.formRegister).then(() => {
            if (this.isLoggedIn) {
              this.loading = false
              this.$router.push('/hi')
            } else {
              this.loading = false
            }
          })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.page-login
  &__card
    max-width: 600px
    margin: 0 auto
</style>
