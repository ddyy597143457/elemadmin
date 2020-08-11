<template>
    <div class="admin">
        <top-component></top-component>
        <content-component>
        </content-component>
    </div>
</template>
<script>
import TopComponent from "./Top"
import ContentComponent from "./Content"

export default {
  name: 'Admin',
  components: {
    TopComponent,
    ContentComponent
  }
}
</script>
<style lang="stylus" scoped>
    
</style>