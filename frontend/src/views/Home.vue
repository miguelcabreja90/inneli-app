<template>
  <div class="home mt-5">
    <div v-if="success" class="alert alert-success" role="alert">
      {{ success }}
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <h2 v-if="!user">Welcome, please log in or register</h2>
    <h2 v-else-if="!user.email_verified_at">
      Hello, {{ user.name }}! Registration successful, please check your inbox
      and click confirmation link. If you did not receive the email, click
      <a href="#" @click="verifyResend">here</a> to request another
    </h2>
    <h2 v-else>Hello, {{ user.name }}! You're in.</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      success: null,
      error: null
    };
  },

  computed: {
    ...mapGetters("auth", ["user"])
  },

  methods: {
    ...mapActions("auth", ["sendVerifyResendRequest"]),

    verifyResend() {
      this.success = this.error = null;
      this.sendVerifyResendRequest()
        .then(() => {
          this.success =
            "A fresh verification link has been sent to your email address.";
        })
        .catch(error => {
          this.error = "Error sending verification link.";
          console.log(error.response);
        });
    }
  }
};
</script>
