<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4>
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
                <img :src="avatar.imageURL" alt="avatar" />
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
            <h6 class="category font-weight-thin mb-3">
              CEO / CO-FOUNDER - Astroworld
            </h6>
            <h4 class="card-title font-weight-light">Travis Scott</h4>
            <p class="card-description font-weight-light">
              You wrote that yourself? wow congrats dude, really, that's very
              cool. i just told everyone in my family about it, everybody thinks
            </p>
          </v-card-text>
        </material-card>
      </v-flex>
      <v-flex xs12 md8>
        <material-card
          color="primary"
          :title="$vuetify.lang.t('$vuetify.user.edit_profile')"
          :text="$vuetify.lang.t('$vuetify.user.sub_profile')"
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.company"
                    :label="$vuetify.lang.t('$vuetify.company')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.username"
                    :label="$vuetify.lang.t('$vuetify.username')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.email"
                    :label="$vuetify.lang.t('$vuetify.email')"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="userData.firstName"
                    :label="$vuetify.lang.t('$vuetify.first_name')"
                  />
                </v-flex>
                <v-flex xs12 md6>
                  <v-text-field
                    v-model="userData.lastName"
                    :label="$vuetify.lang.t('$vuetify.last_name')"
                  />
                </v-flex>
                <v-flex xs12 md12>
                  <v-text-field
                    v-model="userData.address"
                    :label="$vuetify.lang.t('$vuetify.address')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.city"
                    :label="$vuetify.lang.t('$vuetify.city')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.country"
                    :label="$vuetify.lang.t('$vuetify.country')"
                  />
                </v-flex>
                <v-flex xs12 md4>
                  <v-text-field
                    v-model="userData.postalCode"
                    :label="$vuetify.lang.t('$vuetify.postal_code')"
                    type="number"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    v-model="userData.aboutMe"
                    :label="$vuetify.lang.t('$vuetify.about_me')"
                  />
                </v-flex>
                <v-flex xs12 text-xs-right>
                  <v-btn
                    :loading="pending"
                    class="mx-0 font-weight-light"
                    color="primary"
                    @click="updateProfile"
                  >
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
import { mapState, mapActions } from 'vuex'

export default {
  components: { AvatarPicker, MaterialCard },
  data() {
    return {
      loading: false,
      showAvatarPicker: false,
      avatar: null,
      saving: false,
      saved: false
    }
  },
  created() {
    this.getUserData()
  },
  computed: {
    ...mapState('auth', ['userData', 'pending'])
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('auth', ['getUserData']),
    ...mapActions('user', ['updateUser']),
    uploadImage() {
      this.saving = true
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    },
    async updateProfile() {
      await this.updateUser(this.userData).then((data) => {
        console.log(data)
      })
    }
  }
}
</script>
