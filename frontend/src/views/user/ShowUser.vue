<template>
  <v-dialog v-model="toogleShowModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{
          $vuetify.lang.t('$vuetify.titles.show', [
            $vuetify.lang.t('$vuetify.user.user')
          ])
        }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" class="my-10" lazy-validation v-model="formValid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="editUser.firstName"  readonly :label="$vuetify.lang.t('$vuetify.firstName')"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="editUser.lastName"  readonly :label="$vuetify.lang.t('$vuetify.lastName')"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field  readonly v-model="editUser.company" :label="$vuetify.lang.t('$vuetify.company')"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="editUser.email" :label="$vuetify.lang.t('$vuetify.email')" required  readonly></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editUser.username" readonly :label="$vuetify.lang.t('$vuetify.username')" required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="editUser.country"
                item-text="name"
                item-value="id"
                color="pink"
                :items="arrayCountry"
                :label="$vuetify.lang.t('$vuetify.country')"
                required readonly
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="hiddenSpinner" autocomplete="off" name="phone" readonly
                            :label="$vuetify.lang.t('$vuetify.phone')"
                            :placeholder="$vuetify.lang.t('$vuetify.phone')" required
                            v-model="editUser.phone"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field readonly v-model="editUser.address" :label="$vuetify.lang.t('$vuetify.address')"></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field readonly v-model="editUser.aboutMe" :label="$vuetify.lang.t('$vuetify.about_me')"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mb-2" @click="toogleShowModal(false)">
          <v-icon>mdi-close</v-icon>
          {{ $vuetify.lang.t('$vuetify.actions.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ShowUser',
  data() {
    return {
      formValid: false,
    }
  },
  methods: {
    ...mapActions('user', ['updateUser', 'toogleShowModal']),
  },
  computed: {
    ...mapState('user', ['saved', 'editUser']),
    ...mapState('statics', ['arrayCountry'])
  },
  mounted() {

  }
}
</script>

<style scoped></style>
