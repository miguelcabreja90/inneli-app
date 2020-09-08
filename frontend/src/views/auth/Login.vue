<template>
  <v-card class="elevation-1 pa-3 login-card">
    <v-card-text>
      <div class="layout column align-center">
        <img src="/static/m.png" alt="Vue Material Admin" width="120" height="120"/>
        <h1 class="flex my-4 primary--text">{{ $t("login.title") }}</h1>
      </div>
      <v-form v-model="valid" ref="form">
        <v-text-field
          append-icon="email"
          name="login"
          :label="$t('login.account')"
          type="email"
          v-model="details.email"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          :type="hidePassword ? 'password' : 'text'"
          :append-icon="hidePassword ? 'fa fa-eye' : 'fa fa-low-vision'"
          name="password"
          :label="$t('login.password')"
          id="password"
          v-model="details.password"
          @click:append="hidePassword = !hidePassword"
          :rules="[rules.required]"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="login-btn">
      <v-btn icon>
        <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="red">fa fa-google fa-lg</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn block color="primary" :loading="pending" @click="login">{{ $t("login.submit") }}</v-btn>
        <v-btn @click.stop="">{{ $t("login.register") }}</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      dialog: false,
      details: {
        email: null,
        password: null
      },
      valid: false,
      hidePassword: true,
      rules: {
        required: v => !!v || this.$t("rules.required")
      }
    }
  },
  computed: {
    ...mapState("auth", ["userData", "isLoggedIn", "pending"])
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),
    login: function() {
      if (this.$refs.form.validate()) {
        this.sendLoginRequest(this.details).then(() => {
          this.$router.push({ name: "Dashboard" })
        })
      }
    }
  }
}
</script>
<style scoped lang="css"></style>
