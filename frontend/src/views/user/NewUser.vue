<template>
  <v-dialog v-model="toogleNewModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">{{$vuetify.lang.t('$vuetify.titles.new', [$vuetify.lang.t('$vuetify.user.user')])}}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="my-10" lazy-validation v-model="formValid">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field @keypress="letters"
                            v-model="newUser.firstName"
                            :counter="10"
                            :label="$vuetify.lang.t('$vuetify.firstName')"
                            required
                            :rules="formRule.firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                :counter="10" @keypress="letters"
                v-model="newUser.lastName"
                :label="$vuetify.lang.t('$vuetify.lastName')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field @keypress="lettersNumbers"
                            v-model="newUser.company"
                            :counter="25"
                            :label="$vuetify.lang.t('$vuetify.company')"
                            :rules="formRule.company"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                autocomplete="off"
                v-model="newUser.email"
                :rules="formRule.email"
                :label="$vuetify.lang.t('$vuetify.email')"
                required
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field value="" @keypress="lettersNumbers"
                            autocomplete="off"
                            v-model="newUser.username"
                            :counter="8"
                            :label="$vuetify.lang.t('$vuetify.username')"
                            required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                autocomplete="off"
                name="password"
                :label="$vuetify.lang.t('$vuetify.password')"
                type="password"
                required
                :rules="formRule.password"
                v-model="newUser.password"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="newUser.country"
                item-text="name"
                item-value="id"
                color="pink"
                :items="arrayCountry"
                :label="$vuetify.lang.t('$vuetify.country')"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field class="hiddenSpinner" autocomplete="off" name="phone" @keypress="numbers"
                            :label="$vuetify.lang.t('$vuetify.phone')"
                            :placeholder="$vuetify.lang.t('$vuetify.phone')" required
                            v-model="newUser.phone"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="newUser.address" :label="$vuetify.lang.t('$vuetify.address')"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="newUser.aboutMe" :label="$vuetify.lang.t('$vuetify.about_me')"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" class="mb-2" @click="toogleNewModal(false)">
          <v-icon>mdi-close</v-icon>
          {{ $vuetify.lang.t('$vuetify.actions.cancel') }}
        </v-btn>
        <v-btn color="primary" class="mb-2" @click="createNewUser" :disabled="!formValid">
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
  name: 'NewUser',
  data() {
    return {
      formValid: false,
      password_confirmation: '',
      formRule: {
        firstName: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
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
            (!!v && v) === this.newUser.password ||
            this.$vuetify.lang.t(
              '$vuetify.rule.match',
              [this.$vuetify.lang.t('$vuetify.password')],
              [this.$vuetify.lang.t('$vuetify.confirm_password')]
            )
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['createUser', 'toogleNewModal']),
    changePhone(e) {
      console.log(e)
    },
    letters(event) {
      let regex = new RegExp("^[A-Za-z ]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    lettersNumbers(event) {
      let regex = new RegExp("^[a-zA-Z0-9]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    numbers(event) {
      let regex = new RegExp("^[0-9]+$");
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    onCountry(digit) {
      this.newUser.country = this.arrayCountry.filter(c => c.code === digit)[0].name
      console.log(this.newUser.country)
    },
    async createNewUser() {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.createUser(this.newUser).then(() => {
          if (this.saved) {
            this.loading = false
            const msg = this.$vuetify.lang.t(
              '$vuetify.messages.success_profile'
            )
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
    ...mapState('statics', ['arrayCountry']),
    ...mapState('user', ['saved', 'newUser'])
  },
  mounted() {
    this.formValid = false
  }
}
</script>

<style scoped>
.hiddenSpinner input[type='number'] {
  -moz-appearance: textfield;
}

.hiddenSpinner input::-webkit-outer-spin-button,
.hiddenSpinner input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
