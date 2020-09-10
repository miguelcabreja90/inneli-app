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
                name="register"
                :label="$vuetify.lang.t('Name')"
                :placeholder="$vuetify.lang.t('Name')"
                type="text"
                required
                :rules="formRule.name"
                v-model="fromModel.name"
              />
              <v-text-field
                append-icon="email"
                autocomplete="off"
                name="register"
                :label="$vuetify.lang.t('Email')"
                :placeholder="$vuetify.lang.t('Email')"
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
              <v-text-field
                append-icon="lock"
                autocomplete="off"
                name="password_confirmation"
                :label="$vuetify.lang.t('Confirm Password')"
                :placeholder="$vuetify.lang.t('Confirm Password')"
                type="password"
                :rules="formRule.password_confirmation"
                required
                v-model="fromModel.password_confirmation"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              large
              tile
              color="primary"
              @click="registerUser"
              :loading="loading"
            >
              <v-icon>mdi-account-plus</v-icon>
              {{ $vuetify.lang.t('register') }}
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
      fromModel: {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      formRule: {
        name: [
          (v) => !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['name'])
        ],
        email: [
          (v) =>
            !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['email']),
          (v) => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        password: [
          (v) =>
            !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['password']),
          (v) =>
            (v || '').length >= 8 || 'A minimum of 8 characters is not allowed'
        ],
        password_confirmation: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              'password confirm'
            ]),
          (v) =>
            (!!v && v) === this.fromModel.password ||
            'Pasword and Confirm do not match.'
        ]
      }
    }
  },
  computed: {
    ...mapState('auth', ['isLoggedIn', 'fromModel', 'socialIcons']),
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
          this.sendRegisterRequest(this.fromModel).then(() => {
            this.$router.push('/dashboard')
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
