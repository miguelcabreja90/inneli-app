<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3">{{ $route.meta.title || "" }}</h3>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: "Home",
      breadcrumbs: []
    }
  }
}
</script>
<style lang="stylus" scoped>
.disabled
  color: grey
  pointer-events: none
  text-decoration: blink
</style>
