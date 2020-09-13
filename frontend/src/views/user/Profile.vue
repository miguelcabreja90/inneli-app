<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md4>
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
import { mapActions, mapState } from 'vuex'
import Base64Upload from '@/components/core/Base64Upload'

export default {
  components: { Base64Upload, MaterialCard },
  data() {
    return {
      saving: false
    }
  },
  computed: {
    ...mapState('auth', ['userData', 'pending']),
    ...mapState('user', ['saved', 'users'])
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
      await this.updateUser(this.userData).then(() => {
        if (this.saved) {
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
</style>
