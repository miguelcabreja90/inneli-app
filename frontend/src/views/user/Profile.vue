<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4 style="margin-top: 50px">
        <material-card class="v-card-profile">
          <base64-upload
            class="user mx-auto d-block"
            :imageSrc="userData.avatar"
            :imageStyle="{ 'border-radius': '50%' }"
            @change="onChangeImage($event)"
          ></base64-upload>
          <v-slide-x-transition>
            <div v-if="saved === false">
              <v-btn icon class="mx-auto d-block" :loading="saving">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </div>
          </v-slide-x-transition>
          <v-list two-line class="pa-0">
            <v-list-item href="#">
              <v-list-item-action>
                <v-icon color="indigo">mdi-account</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="getFullName"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="$vuetify.lang.t('$vuetify.firstName')"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item href="#">
              <v-list-item-action>
                <v-icon color="indigo">mdi-mail</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="userData.email"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="$vuetify.lang.t('$vuetify.email')"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-list-item href="#">
              <v-list-item-action>
                <v-icon color="indigo">mdi-phone</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="userData.phone"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="$vuetify.lang.t('$vuetify.phone')"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </material-card>
      </v-flex>
      <v-flex xs12 md8>
        <material-card
          color="color"
          :title="$vuetify.lang.t('$vuetify.user.edit_profile')"
          :text="$vuetify.lang.t('$vuetify.user.sub_profile')"
        >
          <v-form ref="form" class="my-10" lazy-validation v-model="formValid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.company"
                    :label="$vuetify.lang.t('$vuetify.company')"
                    :rules="formRule.company"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.username"
                    :label="$vuetify.lang.t('$vuetify.username')"
                    :rules="formRule.username"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.email"
                    :label="$vuetify.lang.t('$vuetify.email')"
                    :rules="formRule.email"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.firstName"
                    :label="$vuetify.lang.t('$vuetify.first_name')"
                    :rules="formRule.firstName"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.lastName"
                    :label="$vuetify.lang.t('$vuetify.last_name')"
                    :rules="formRule.lastName"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    required
                    v-model="userData.phone"
                    :label="$vuetify.lang.t('$vuetify.phone')"
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="userData.address"
                    :label="$vuetify.lang.t('$vuetify.address')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :rules="formRule.country"
                    v-model="userData.country"
                    :items="country"
                    item-text="country"
                    item-value="country"
                    color="pink"
                    @change="changeCountry"
                    :label="$vuetify.lang.t('$vuetify.country')"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select
                    :rules="formRule.city"
                    v-model="userData.city"
                    :disabled="disabledCity"
                    :items="cityCountry"
                    item-text="city"
                    item-value="id"
                    color="pink"
                    :label="$vuetify.lang.t('$vuetify.city')"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    counter="5"
                    class="hiddenSpinner"
                    v-model="userData.postalCode"
                    :label="$vuetify.lang.t('$vuetify.postal_code')"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    counter="250"
                    v-model="userData.aboutMe"
                    :label="$vuetify.lang.t('$vuetify.about_me')"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="primary" @click="updateProfile" :loading="loading"
                    :disabled="!formValid">
                    <v-icon>mdi-account-edit</v-icon>
                    {{ $vuetify.lang.t('$vuetify.user.btn_edit') }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MaterialCard from '@/components/utils/MaterialCard'
import { mapActions, mapState } from 'vuex'
import Base64Upload from '@/components/core/Base64Upload'

export default {
  components: { Base64Upload, MaterialCard },
  data() {
    return {
      color: 'primary',
      disabledCity: true,
      formValid: false,
      loading: false,
      cityCountry: [],
      saving: false,
      formRule: {
        company: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.company')
            ])
        ],
        country: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.country')
            ])
        ],
        firstName: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.name')
            ])
        ],
        username: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.username')
            ])
        ],
        lastName: [
          (v) =>
            !!v ||
            this.$vuetify.lang.t('$vuetify.rule.required', [
              this.$vuetify.lang.t('$vuetify.lastName')
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
        ]
      }
    }
  },
  created() {
    this.validateData()
  },
  computed: {
    ...mapState('auth', ['userData', 'pending']),
    ...mapState('user', ['saved', 'users']),
    ...mapState('statics', ['country', 'city']),
    getFullName() {
      return `${this.userData.firstName} ${this.userData.lastName}`
    }
  },
  beforeCreate() {
    this.$nextTick(function() {
      this.getUserData()
    })
  },
  methods: {
    ...mapActions('auth', ['getUserData']),
    ...mapActions('user', ['updateUser', 'updateAvatar']),
    async updateProfile() {
      this.loading = true
      await this.updateUser(this.userData).then(() => {
        if (this.saved) {
          this.loading = false
          const msg = this.$vuetify.lang.t('$vuetify.messages.success_profile')
          this.$Toast.fire({
            icon: 'success',
            title: msg
          })
        }
      })
    },
    async onChangeImage(file) {
      this.saving = true
      const id = this.userData.id
      await this.updateAvatar({ id, file }).then(() => {
        if (this.saved) {
          const msg = this.$vuetify.lang.t('$vuetify.messages.success_avatar')
          this.$Toast.fire({
            icon: 'success',
            title: msg
          })
        }
      })
    },
    changeCountry() {
      this.disabledCity = false
      this.cityCountry = this.city.filter(
        (c) =>
          c.country_id ==
          this.country.filter((co) => co.country === this.userData.country)[0]
            .id
      )
    },
    validateData() {
      if (this.userData.username === '') this.color = 'warning'
      else this.color = 'primary'
    }
  }
}
</script>
<style scoped>
.user {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.hiddenSpinner input[type='number'] {
  -moz-appearance: textfield;
}

.hiddenSpinner input::-webkit-outer-spin-button,
.hiddenSpinner input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
