<template>
  <div>
    <!-- slot for parent component to activate the file changer -->
    <div @click="launchFilePicker()">
      <slot name="activator">
        <div>
          <v-avatar
            size="150px"
            v-ripple
            v-if="!avatar"
            slot="offset"
            class="grey lighten-3 mb-3 mx-auto d-block"
          >
          </v-avatar>
          <v-avatar size="150px" v-ripple v-else class="mb-3 mx-auto d-block">
            <img :src="src" alt="avatar" />
          </v-avatar>
        </div>
      </slot>
    </div>
    <!-- image input: style is set to hidden and assigned a ref so that it can be triggered -->
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display:none"
    />
    <!-- error dialog displays any potential error messages -->
    <!--<v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <v-card-text class="subheading">{{ errorText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" flat>Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>

<script>
export default {
  name: 'AvatarPicker',
  data: () => ({
    errorDialog: null,
    errorText: '',
    uploadFieldName: 'file',
    maxSize: 1024,
    src: this.imageSrc
  }),
  props: {
    // Use "value" to enable using v-model
    //value: Object
    imageSrc: String,
    imageStyle: Object
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click()
    },
    onFileChange(event) {
      if (event.target.files && event.target.files[0]) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.addEventListener('load', (e) => {
          this.src = e.target.result
          let [, base64] = this.src.split(',')
          this.$emit('change', {
            size: file.size,
            type: file.type,
            name: file.name,
            base64: base64
          })
        })
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style scoped></style>
