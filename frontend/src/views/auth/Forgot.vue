<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <h1 class="primary--text display-1 text-center">
              {{ $vuetify.lang.t('$vuetify.forgot') }}
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
                name="register"
                :label="$vuetify.lang.t('$vuetify.email')"
                :placeholder="$vuetify.lang.t('$vuetify.email')"
                type="email"
                required
                :rules="formRule.email"
                v-model="email"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" :to="{ name: 'login' }">
              <v-icon>mdi-account</v-icon>
              {{ $vuetify.lang.t('$vuetify.login') }}
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              @click="sendNotify"
              :loading="loading"
              :disabled="!formValid"
            >
              <v-icon>mdi-send</v-icon>
              {{ $vuetify.lang.t('$vuetify.forgot_btn') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Forgot',
  data() {
    return {
      email: '',
      loading: false,
      formValid: false,
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
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['errors']),
    ...mapState('auth', ['successForgot']),
    prefix() {
      return ''
    }
  },
  methods: {
    ...mapActions('auth', ['sendEmailForgot']),
    sendNotify() {
      this.loading = true
      this.sendEmailForgot(this.email).then(() => {
        if (this.successForgot) {
          this.loading = false
          const msg = this.$vuetify.lang.t('$vuetify.messages.check_mail')
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
