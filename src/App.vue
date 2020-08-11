<template>
  <div id="app">
    <top-component></top-component>
    <content-component>
    </content-component>
  </div>
</template>

<script>

import TopComponent from "./views/Top"
import ContentComponent from "./views/Content"

export default {
  name: 'App',
  components: {
    TopComponent,
    ContentComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
