<template>
  <v-container class="page-login" fill-height>
    <v-row>
      <v-col>
        <v-card class="pa-3 page-login__card" tile>
          <v-card-title>
            <img src="/static/m.png" alt="Inneli APP" width="55"/>
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
                name="confirm_password"
                :label="$vuetify.lang.t('Confirm Password')"
                :placeholder="$vuetify.lang.t('Confirm Password')"
                type="password"
                :rules="formRule.confirm_password"
                required
                v-model="fromModel.confirm_password"
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
            <v-spacer/>
            <v-btn large tile color="primary" @click="registerUser" :loading="loading">
              {{ $vuetify.lang.t('register') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex'
  export default {
    name: "Register",
    data() {
      return {
        loading: false,
        formValid: false,
        fromModel: {
          name: '',
          username: '',
          email: '',
          password: '',
          confirm_password: ''
        },
        formRule: {
          name: [
            (v) =>
              !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['name'])
          ],
          email: [
            (v) =>
              !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['email'])
          ],
          password: [
            (v) =>
              !!v || this.$vuetify.lang.t('$vuetify.rule.required', ['password'])
          ],
          confirm_password: [
            (v) =>
              !!v || v !== this.password || this.$vuetify.lang.t('$vuetify.rule.required', ['confirm password'])
          ],
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
          this.loading = true,
          setTimeout(() => {
            this.sendRegisterRequest(this.fromModel).then(() => {
              this.$router.push('/dashboard')
            })
          }, 1000)
        }
      },
    }
  }
</script>

<style lang="sass" scoped>
  .page-login
    &__card
    max-width: 600px
    margin: 0 auto
</style>