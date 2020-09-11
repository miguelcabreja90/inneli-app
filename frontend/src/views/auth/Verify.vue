<template>
  <v-app class="exception">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div class="text-md-center">
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
            <div><v-btn color="primary" @click="goLogin">Go Login</v-btn></div>
          </div>
          <h1 v-show="!error">Please wait..</h1>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  props: ['hash'],

  data() {
    return {
      error: null
    }
  },

  mounted() {
    this.sendVerifyRequest(this.hash)
      .then(() => {
        //this.$router.push('/')
      })
      .catch((error) => {
        console.log(error.response)
        this.error = 'Error verifying email'
      })
  },

  computed: {
    ...mapGetters('auth', ['user'])
  },

  methods: {
    ...mapActions('auth', ['sendVerifyRequest']),
    goLogin() {
      router.push('/auth/login')
    }
  }
}
</script>
