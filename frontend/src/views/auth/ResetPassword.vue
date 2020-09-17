<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <h1 class="primary--text display-1 text-center">
              {{ $vuetify.lang.t('$vuetify.reset_password') }}
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
                append-icon="email"
                autocomplete="off"
                name="email"
                :label="$vuetify.lang.t('$vuetify.email')"
                :placeholder="$vuetify.lang.t('$vuetify.email')"
                type="email"
                required
                :rules="formRule.email"
                v-model="formReset.email"
              />
              <v-text-field
                autocomplete="off"
                :type="hidePassword1 ? 'password' : 'text'"
                :append-icon="hidePassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                name="password"
                :label="$vuetify.lang.t('$vuetify.password')"
                :placeholder="$vuetify.lang.t('$vuetify.password')"
                :rules="formRule.password"
                required
                v-model="formReset.password"
                @click:append="hidePassword1 = !hidePassword1"
              />
              <v-text-field
                name="password_confirmation"
                :label="$vuetify.lang.t('$vuetify.confirm_password')"
                :placeholder="$vuetify.lang.t('$vuetify.confirm_password')"
                autocomplete="off"
                :type="hidePassword2 ? 'password' : 'text'"
                :append-icon="hidePassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="formRule.password_confirmation"
                required
                v-model="formReset.password_confirmation"
                @click:append="hidePassword2 = !hidePassword2"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="changePassword"
              :loading="loading"
              :disabled="!formValid"
            >
              <v-icon>mdi-content-save</v-icon>
              {{ $vuetify.lang.t('$vuetify.reset_password') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ResetPassword',
  data() {
    return {
      loading: false,
      formValid: false,
      hidePassword1: true,
      hidePassword2: true,
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
        ],
        password_confirmation: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.confirm_password')
            ]),
          (v) =>
            (!!v && v) === this.formReset.password ||
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
    ...mapState('auth', ['formReset', 'successReset'])
  },
  methods: {
    ...mapActions('auth', ['sendResetPassword']),
    changePassword() {
      const data = {
        token: this.$route.params.hash,
        email: this.formReset.email,
        password: this.formReset.password,
        password_confirmation: this.formReset.password_confirmation
      }
      this.sendResetPassword(data).then(() => {
        if (this.successReset) {
          this.loading = false
          const msg = this.$vuetify.lang.t('$vuetify.messages.password_success')
          this.$Toast.fire({
            icon: 'success',
            title: msg,
            timer: 5000
          })
          this.$router.push({ name: 'login' })
        }
      })
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
