<template>
  <v-dialog v-model="toogleEditModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span
          class="headline">{{ $vuetify.lang.t('$vuetify.titles.edit', [$vuetify.lang.t('$vuetify.user.user')]) }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" class="my-10" lazy-validation v-model="formValid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="editUser.firstName" :rules="formRule.firstName" :counter="10"
                            :label="$vuetify.lang.t('$vuetify.firstName')" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="editUser.lastName" :counter="10" :label="$vuetify.lang.t('$vuetify.lastName')"
                            required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="editUser.company" :counter="25"
                            :label="$vuetify.lang.t('$vuetify.company')" :rules="formRule.company"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="editUser.email" :rules="formRule.email" autocomplete="off"
                            :label="$vuetify.lang.t('$vuetify.email')" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editUser.username" autocomplete="off"
                :counter="8"
                :label="$vuetify.lang.t('$vuetify.username')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="editUser.country"
                item-text="country"
                item-value="country"
                color="pink"
                :items="country"
                :label="$vuetify.lang.t('$vuetify.country')"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="hiddenSpinner" autocomplete="off" name="phone"
                            :label="$vuetify.lang.t('$vuetify.phone')"
                            :placeholder="$vuetify.lang.t('$vuetify.phone')" type="number" required
                            v-model="editUser.phone"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field v-model="editUser.address" :label="$vuetify.lang.t('$vuetify.address')"
                            required></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="editUser.aboutMe" :label="$vuetify.lang.t('$vuetify.about_me')"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mb-2" @click="toogleEditModal(false)">
          <v-icon>mdi-close</v-icon>
          {{ $vuetify.lang.t('$vuetify.actions.cancel') }}
        </v-btn>
        <v-btn color="primary" class="mb-2" @click="updateUserHandler" :disabled="!formValid">
          <v-icon>mdi-check</v-icon>
          {{ $vuetify.lang.t('$vuetify.actions.save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: "EditUser",
  data() {
    return {
      formValid: false,
      formRule: {
        firstName: [
          (v) =>
            !!v || this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.name')
            ])
        ],
        company: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.company')
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
      }
    }
  },
  methods: {
    ...mapActions('user', ['updateUser', 'toogleEditModal']),
    async updateUserHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.updateUser(this.editUser).then(() => {
          if (this.saved) {
            this.loading = false
            const msg = this.$vuetify.lang.t('$vuetify.messages.success_profile')
            this.$Toast.fire({
              icon: 'success',
              title: msg
            })
          }
        })
      }
    }
  },
  computed: {
    ...mapState('user', ['saved', 'editUser',]),
    ...mapState('statics', ['country']),
  }
}
</script>

<style scoped>

</style>