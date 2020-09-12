<template>
  <v-app class="exception">
    <v-main fluid fill-height>
      <v-layout align-center justify-center>
        <div class="text-md-center">
          <v-alert v-if="error" type="error">
            {{ error }}
          </v-alert>
          <v-container v-show="!error" style="height: 400px;">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="subtitle-1 text-center" cols="12">
                {{ this.$vuetify.lang.t('$vuetify.verify.wait') }}
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="deep-purple accent-4"
                  indeterminate
                  rounded
                  height="6"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-layout>
    </v-main>
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
        this.$router.push({ name: 'Profile' })
      })
      .catch((error) => {
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
