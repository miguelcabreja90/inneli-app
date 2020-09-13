<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4 style="margin-top: 50px">
        <material-card class="v-card-profile">
          <avatar-picker v-model="avatar">
            <div slot="activator">
              <v-avatar
                size="150px"
                v-ripple
                v-if="!avatar"
                slot="offset"
                class="grey lighten-3 mb-3 mx-auto d-block"
              >
              </v-avatar>
              <v-avatar
                size="150px"
                v-ripple
                v-else
                class="mb-3 mx-auto d-block"
              >
                <img :src="avatar.imageURL" alt="avatar"/>
              </v-avatar>
            </div>
          </avatar-picker>
          <v-slide-x-transition>
            <div v-if="avatar && saved == false">
              <v-btn
                icon
                class="mx-auto d-block"
                :loading="saving"
                @click="uploadImage"
              >
                <v-icon>mdi-content-save-all</v-icon>
              </v-btn>
            </div>
          </v-slide-x-transition>
          <v-card-text class="text-xs-center">
            <h4 class="card-title font-weight-light" v-text="userData.firstName"></h4>
            <p class="card-description font-weight-light" v-text="userData.about_me">
            </p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12 md8>
        <material-card
          color="color"
          :title="$vuetify.lang.t('$vuetify.user.edit_profile')"
          :text="$vuetify.lang.t('$vuetify.user.sub_profile')"
        >
          <v-form
            ref="form"
            class="my-10"
            lazy-validation
            v-model="formValid">
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted
                                v-model="userData.company"
                                :label="$vuetify.lang.t('$vuetify.company')"
                                :rules="formRule.company"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted
                                v-model="userData.username"
                                :label="$vuetify.lang.t('$vuetify.username')"
                                :rules="formRule.username"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted
                                v-model="userData.email"
                                :label="$vuetify.lang.t('$vuetify.email')"
                                :rules="formRule.email"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted
                                v-model="userData.firstName"
                                :label="$vuetify.lang.t('$vuetify.first_name')"
                                :rules="formRule.firstName"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted
                                v-model="userData.lastName"
                                :label="$vuetify.lang.t('$vuetify.last_name')"
                                :rules="formRule.lastName"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted required counter="8" type="number"
                                class="hiddenSpinner"
                                v-model="userData.phone"
                                :label="$vuetify.lang.t('$vuetify.phone')"
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field solo-inverted
                                v-model="userData.address"
                                :label="$vuetify.lang.t('$vuetify.address')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-select solo-inverted :rules="formRule.country" v-model="userData.country"
                            :items="country" item-text="country" item-value="country" color="pink"
                            @change="changeCountry"
                            :label="$vuetify.lang.t('$vuetify.country')" required></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-select solo-inverted :rules="formRule.city" v-model="userData.city" :disabled="disabledCity"
                            :items="cityCountry" item-text="city" item-value="id" color="pink"
                            :label="$vuetify.lang.t('$vuetify.city')" required></v-select>
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field solo-inverted counter="5"
                                class="hiddenSpinner"
                                v-model="userData.postalCode"
                                :label="$vuetify.lang.t('$vuetify.postal_code')"
                                type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea solo-inverted
                              counter="250"
                              v-model="userData.aboutMe"
                              :label="$vuetify.lang.t('$vuetify.about_me')"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn large tile class="mx-0 font-weight-light" color="primary"
                    @click="updateProfile" :loading="loading" :disabled="!formValid">
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
  import AvatarPicker from '@/components/user/AvatarPicker'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'Profile',
    components: {AvatarPicker, MaterialCard},
    data() {
      return {
        color: "primary",
        disabledCity: true,
        loading: false,
        showAvatarPicker: false,
        avatar: null,
        cityCountry: [],
        saving: false,
        saved: false,
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
          ],
        }
      }
    },
    created() {
      this.getUserData(),
        this.validateData()
    },
    computed: {
      ...mapState('auth', ['userData', 'pending']),
      ...mapState('user', ['user', 'pending']),
      ...mapState('statics', ["country", "city"])
    },
    mounted() {
      this.validateData()
    },
    watch: {
      avatar: {
        handler: function () {
          this.saved = false
        },
        deep: true
      },
    },
    methods: {
      ...mapActions('auth', ['getUserData']),
      ...mapActions('user', ['updateUser']),
      changeCountry() {
        console.log(this.userData.country)
        this.disabledCity = false;
        this.cityCountry = this.city.filter(c => c.country_id == this.country.filter(co => co.country === this.userData.country)[0].id)
      },
      validateData() {
        console.log(this.userData);
        if (this.userData.username === '')
          this.color = 'warning'
        else
          this.color = 'primary'
      },
      uploadImage() {
        this.saving = true
        setTimeout(() => this.savedAvatar(), 1000)
      },
      savedAvatar() {
        this.saving = false
        this.saved = true
      },
      updateProfile() {
        if (this.$refs.form.validate()) {
          this.loading = true
          setTimeout(() => {
            this.updateUser(this.userData).then((data) => {
                this.loading = false
                this.$router.push('/dashboard')
            })
          }, 1000)
        }
      }
    }
  }
</script>

<style>
  .hiddenSpinner input[type='number'] {
    -moz-appearance: textfield;
  }

  .hiddenSpinner input::-webkit-outer-spin-button,
  .hiddenSpinner input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }


</style>
